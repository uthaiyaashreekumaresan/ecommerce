import React, { createContext, useContext, useState, useEffect } from 'react';
import { subscribeToProductUpdates } from '../utils/productSync';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('perfume_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [promoCode, setPromoCode] = useState(() => localStorage.getItem('perfume_promo') || '');
  const [discountPercent, setDiscountPercent] = useState(() => {
    return localStorage.getItem('perfume_promo') === 'NOIR10' ? 10 : 0;
  });

  useEffect(() => {
    localStorage.setItem('perfume_cart', JSON.stringify(cart));
  }, [cart]);

  // Real-time synchronization: Update cart items if product image is updated by admin
  useEffect(() => {
    const unsubscribe = subscribeToProductUpdates(({ productId, imageUrl }) => {
      setCart((prev) =>
        prev.map((item) => (item.productId === Number(productId) ? { ...item, imageUrl } : item))
      );
    });
    return () => unsubscribe();
  }, []);

  const addToCart = (product, size_ml = 50, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.productId === product.id && item.size_ml === size_ml
      );

      const basePrice = Number(product.discount_price || product.price);
      // If 100ml, price is ~1.7x of 50ml
      const unitPrice = size_ml === 100 ? Math.round(basePrice * 1.7) : basePrice;

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            productId: product.id,
            productName: product.name,
            brandName: product.brand_name || 'Florencia Luxe',
            price: unitPrice,
            regularPrice: size_ml === 100 ? Math.round(Number(product.price) * 1.7) : Number(product.price),
            size_ml,
            quantity,
            imageUrl: product.image_url,
            stock: product.stock
          }
        ];
      }
    });
  };

  const updateQuantity = (productId, size_ml, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, size_ml);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size_ml === size_ml
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId, size_ml) => {
    setCart((prev) =>
      prev.filter((item) => !(item.productId === productId && item.size_ml === size_ml))
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setDiscountPercent(0);
    localStorage.removeItem('perfume_cart');
    localStorage.removeItem('perfume_promo');
  };

  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'NOIR10' || clean === 'FLORENCIA10') {
      setPromoCode(clean);
      setDiscountPercent(10);
      localStorage.setItem('perfume_promo', clean);
      return { success: true, message: 'Coupon applied! You got 10% OFF.' };
    } else {
      return { success: false, message: 'Invalid coupon code. Try NOIR10' };
    }
  };

  const removePromo = () => {
    setPromoCode('');
    setDiscountPercent(0);
    localStorage.removeItem('perfume_promo');
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round((subtotal * discountPercent) / 100);
  // Free delivery if subtotal > 999 or empty
  const shippingFee = cart.length === 0 || (subtotal - discount) >= 999 ? 0 : 99;
  const totalAmount = Math.max(0, subtotal - discount + shippingFee);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        promoCode,
        discountPercent,
        applyPromo,
        removePromo,
        subtotal,
        discount,
        shippingFee,
        totalAmount,
        totalItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

