import React, { createContext, useContext, useState, useEffect } from 'react';
import { wishlistService } from '../services/wishlistService';
import { subscribeToProductUpdates } from '../utils/productSync';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useAuth();

  // Instant local state with localStorage fallback for guests and fast initial paint
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('perfume_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);

  // Sync to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem('perfume_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed to save wishlist to localStorage:', e);
    }
  }, [wishlist]);

  // When user logs in, fetch their cloud wishlist and merge guest items
  useEffect(() => {
    async function loadUserWishlist() {
      if (!user) return;
      setLoading(true);
      try {
        // If guest had local items, sync them to user's DB account
        const localIds = wishlist.map((p) => p.id).filter(Boolean);
        if (localIds.length > 0) {
          const syncRes = await wishlistService.syncWishlist(localIds).catch(() => null);
          if (syncRes && syncRes.success && Array.isArray(syncRes.data)) {
            setWishlist(syncRes.data);
            return;
          }
        }

        const res = await wishlistService.getWishlist();
        if (res.success && Array.isArray(res.data)) {
          setWishlist(res.data);
        }
      } catch (err) {
        console.warn('Could not fetch cloud wishlist:', err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUserWishlist();
  }, [user]);

  // Real-time synchronization: Update wishlist items when admin modifies image
  useEffect(() => {
    const unsubscribe = subscribeToProductUpdates(({ productId, imageUrl }) => {
      setWishlist((prev) =>
        prev.map((item) => (item.id === Number(productId) ? { ...item, image_url: imageUrl } : item))
      );
    });
    return () => unsubscribe();
  }, []);

  // Helper: check if product is in wishlist
  const isInWishlist = (productId) => {
    if (!productId) return false;
    const targetId = Number(productId);
    return wishlist.some((item) => Number(item.id) === targetId);
  };

  // Toggle product in wishlist with instant UI update
  const toggleWishlist = async (product) => {
    if (!product || !product.id) return { added: false };
    const targetId = Number(product.id);
    const exists = isInWishlist(targetId);

    if (exists) {
      // Remove immediately from state
      setWishlist((prev) => prev.filter((item) => Number(item.id) !== targetId));

      if (user) {
        wishlistService.removeFromWishlist(targetId).catch((err) => {
          console.warn('Failed to sync remove with backend:', err.message);
        });
      }

      return { added: false, message: `Removed ${product.name} from your wishlist` };
    } else {
      // Add immediately to state (prevent duplicate)
      const cleanProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        discount_price: product.discount_price,
        image_url: product.image_url,
        brand_name: product.brand_name || 'Florencia Luxe',
        category_name: product.category_name,
        gender: product.gender,
        volume_ml: product.volume_ml || 50,
        rating: product.rating || 4.8,
        stock: product.stock !== undefined ? product.stock : 10
      };

      setWishlist((prev) => [cleanProduct, ...prev.filter((item) => Number(item.id) !== targetId)]);

      if (user) {
        wishlistService.addToWishlist(targetId).catch((err) => {
          console.warn('Failed to sync add with backend:', err.message);
        });
      }

      return { added: true, message: `Added ${product.name} to your wishlist` };
    }
  };

  // Explicit remove
  const removeFromWishlist = async (productId) => {
    const targetId = Number(productId);
    setWishlist((prev) => prev.filter((item) => Number(item.id) !== targetId));

    if (user) {
      wishlistService.removeFromWishlist(targetId).catch((err) => {
        console.warn('Failed to sync remove with backend:', err.message);
      });
    }
  };

  // Clear all
  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('perfume_wishlist');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        loading
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

