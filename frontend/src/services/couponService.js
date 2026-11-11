import api from './api';

export const couponService = {
  // Fetch active promotional coupons
  async getPromotionalCoupons() {
    try {
      const res = await api.get('/coupons/promotional');
      return res.data;
    } catch (err) {
      console.warn('Failed to fetch promotional coupons:', err);
      return { success: false, data: [] };
    }
  },

  // Dynamically fetch coupon code for a specific offer
  async getOfferCoupon(offerId = 'active') {
    try {
      const res = await api.get(`/coupons/offer/${offerId}`);
      return res.data;
    } catch (err) {
      console.warn('Failed to fetch offer coupon:', err);
      return { success: false, message: err.response?.data?.message || err.message };
    }
  },

  // Validate coupon at checkout or cart
  async validateCoupon(code, amount = 0) {
    const res = await api.get(`/coupons/validate/${encodeURIComponent(code)}?amount=${amount}`);
    return res.data;
  }
};

export default couponService;

