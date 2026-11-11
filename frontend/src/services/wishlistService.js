import api from './api';

export const wishlistService = {
  // Fetch user wishlist
  async getWishlist() {
    const res = await api.get('/wishlist');
    return res.data;
  },

  // Toggle a product in wishlist (adds if absent, removes if present)
  async toggleWishlist(productId) {
    const res = await api.post('/wishlist/toggle', { productId });
    return res.data;
  },

  // Explicitly add to wishlist
  async addToWishlist(productId) {
    const res = await api.post('/wishlist/add', { productId });
    return res.data;
  },

  // Explicitly remove from wishlist
  async removeFromWishlist(productId) {
    const res = await api.delete(`/wishlist/${productId}`);
    return res.data;
  },

  // Sync guest wishlist items into user account upon sign-in
  async syncWishlist(productIds) {
    const res = await api.post('/wishlist/sync', { productIds });
    return res.data;
  }
};

