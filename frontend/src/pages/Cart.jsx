import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  Typography,
  Button,
  TextField,
  IconButton,
  Alert,
  Divider,
  LinearProgress
} from '@mui/material';
import {
  DeleteOutline,
  ShoppingBagOutlined,
  ArrowForward,
  LocalShippingOutlined,
  ConfirmationNumberOutlined
} from '@mui/icons-material';

export default function Cart() {
  const {
    cart,
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
  } = useCart();

  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyPromo(couponInput);
    setCouponMessage({ type: res.success ? 'success' : 'error', text: res.message });
    if (res.success) setCouponInput('');
  };

  const freeShippingThreshold = 999;
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: '65vh' }}>
        <div className="p-5 bg-white rounded border d-inline-block shadow-sm" style={{ maxWidth: 480, borderColor: '#E2DFEB' }}>
          <ShoppingBagOutlined sx={{ fontSize: 64, color: '#77708F', mb: 2 }} />
          <h3 className="fw-bold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            Your Shopping Bag Is Empty
          </h3>
          <p className="text-muted mb-4" style={{ fontSize: '0.88rem' }}>
            Discover our artisanal perfumes crafted with imported French fragrance oils and find your signature scent today.
          </p>
          <Button
            variant="contained"
            component={Link}
            to="/products"
            size="large"
            sx={{ backgroundColor: '#77708F', color: '#292536', fontWeight: 700, px: 4 }}
          >
            Explore Perfumes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-5" style={{ backgroundColor: '#F7F5FA', minHeight: '80vh' }}>
      <div className="container">
        <h2 className="fw-bold mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
          Shopping Bag ({totalItems} {totalItems === 1 ? 'Item' : 'Items'})
        </h2>

        {/* Free Shipping Progress Alert */}
        <div className="p-3 bg-white rounded border mb-4 shadow-sm" style={{ borderColor: '#E2DFEB' }}>
          <div className="d-flex align-items-center gap-2 mb-2">
            <LocalShippingOutlined sx={{ color: '#77708F' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
              {amountNeeded === 0
                ? '🎉 Congratulations! You have unlocked FREE Express Delivery!'
                : `Add ₹${amountNeeded.toLocaleString('en-IN')} more to unlock FREE Delivery!`}
            </span>
          </div>
          <LinearProgress
            variant="determinate"
            value={progressToFreeShipping}
            sx={{
              height: 7,
              borderRadius: 4,
              backgroundColor: '#eee',
              '& .MuiLinearProgress-bar': { backgroundColor: '#77708F' }
            }}
          />
        </div>

        <div className="row g-4">
          {/* Cart Items List (col-lg-8) */}
          <div className="col-12 col-lg-8">
            <div className="bg-white rounded border shadow-sm" style={{ borderColor: '#E2DFEB' }}>
              <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                <span className="fw-bold" style={{ fontSize: '0.9rem' }}>Fragrance Item</span>
                <Button size="small" onClick={clearCart} sx={{ color: '#888', fontSize: '0.75rem' }}>
                  Clear Bag
                </Button>
              </div>

              <div className="p-3">
                {cart.map((item) => (
                  <div key={`${item.productId}-${item.size_ml}`} className="py-3 border-bottom last-border-0">
                    <div className="row align-items-center g-3">
                      {/* Thumbnail */}
                      <div className="col-3 col-sm-2">
                        <div
                          style={{
                            width: '100%',
                            paddingTop: '100%',
                            position: 'relative',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            backgroundColor: '#f5f2eb'
                          }}
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.productName}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="col-9 col-sm-4">
                        <span style={{ fontSize: '0.7rem', color: '#77708F', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
                          {item.brandName}
                        </span>
                        <h6 className="fw-bold mb-1" style={{ fontSize: '0.92rem' }}>
                          {item.productName}
                        </h6>
                        <span className="badge bg-light text-dark border" style={{ fontSize: '0.72rem' }}>
                          {item.size_ml} ML Bottle
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="col-6 col-sm-3 d-flex align-items-center">
                        <div className="d-flex align-items-center border rounded bg-light" style={{ borderColor: '#ddd' }}>
                          <button
                            type="button"
                            className="btn btn-sm px-2 py-0.5"
                            onClick={() => updateQuantity(item.productId, item.size_ml, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="px-2.5 fw-bold" style={{ fontSize: '0.85rem' }}>
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="btn btn-sm px-2 py-0.5"
                            onClick={() => updateQuantity(item.productId, item.size_ml, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>

                        <IconButton
                          size="small"
                          onClick={() => removeFromCart(item.productId, item.size_ml)}
                          sx={{ ml: 1, color: '#999', '&:hover': { color: '#d32f2f' } }}
                          title="Remove item"
                        >
                          <DeleteOutline fontSize="small" />
                        </IconButton>
                      </div>

                      {/* Item Total */}
                      <div className="col-6 col-sm-3 text-end">
                        <div className="fw-bold" style={{ fontSize: '1rem', color: '#292536' }}>
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                        {item.regularPrice > item.price && (
                          <div className="text-muted text-decoration-line-through" style={{ fontSize: '0.75rem' }}>
                            ₹{(item.regularPrice * item.quantity).toLocaleString('en-IN')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3">
              <Button component={Link} to="/products" color="inherit" sx={{ fontSize: '0.82rem' }}>
                ← Continue Browsing Fragrances
              </Button>
            </div>
          </div>

          {/* Order Summary (col-lg-4) */}
          <div className="col-12 col-lg-4">
            <div className="bg-white p-4 rounded border shadow-sm" style={{ borderColor: '#E2DFEB' }}>
              <h5 className="fw-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                Order Summary
              </h5>

              {/* Coupon Form */}
              <div className="mb-4">
                <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                  <ConfirmationNumberOutlined sx={{ fontSize: 16, mr: 0.5, color: '#77708F' }} />
                  Have a Promo Code?
                </label>
                {promoCode ? (
                  <div className="d-flex justify-content-between align-items-center p-2 rounded bg-success-subtle border border-success">
                    <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                      Code <strong>{promoCode}</strong> applied ({discountPercent}% OFF)
                    </span>
                    <Button size="small" color="error" onClick={removePromo} sx={{ fontSize: '0.75rem', p: 0 }}>
                      Remove
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control form-control-sm text-uppercase"
                      placeholder="e.g. NOIR10"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      size="small"
                      sx={{ backgroundColor: '#292536', color: '#fff', '&:hover': { backgroundColor: '#000' } }}
                    >
                      Apply
                    </Button>
                  </form>
                )}

                {couponMessage && (
                  <Alert severity={couponMessage.type} sx={{ mt: 1, py: 0.5, fontSize: '0.75rem' }}>
                    {couponMessage.text}
                  </Alert>
                )}
              </div>

              <Divider sx={{ my: 2 }} />

              {/* Cost Breakdown */}
              <div className="d-flex justify-content-between mb-2" style={{ fontSize: '0.88rem' }}>
                <span className="text-muted">Bag Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discount > 0 && (
                <div className="d-flex justify-content-between mb-2 text-success" style={{ fontSize: '0.88rem' }}>
                  <span>Coupon Discount ({discountPercent}%)</span>
                  <span>- ₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="d-flex justify-content-between mb-2" style={{ fontSize: '0.88rem' }}>
                <span className="text-muted">Estimated Delivery</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-success fw-bold">FREE</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <Divider sx={{ my: 2 }} />

              <div className="d-flex justify-content-between mb-4 align-items-baseline">
                <span className="fw-bold" style={{ fontSize: '1.05rem' }}>Total Amount</span>
                <span className="fw-bold" style={{ fontSize: '1.35rem', color: '#292536' }}>
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <Button
                variant="contained"
                fullWidth
                size="large"
                endIcon={<ArrowForward />}
                onClick={() => navigate('/checkout')}
                sx={{
                  backgroundColor: '#77708F',
                  color: '#292536',
                  fontWeight: 700,
                  py: 1.5,
                  fontSize: '0.95rem',
                  '&:hover': { backgroundColor: '#645D7B' }
                }}
              >
                Proceed to Checkout
              </Button>

              <div className="text-center mt-3 text-muted" style={{ fontSize: '0.75rem' }}>
                🔒 Safe & Encrypted Checkout | 100% Authentic Scents
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
