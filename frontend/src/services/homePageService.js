import api from './api';

export const homePageService = {
  // Public: fetch active dynamic homepage content
  async getPublicHomePage() {
    const res = await api.get('/homepage');
    return res.data;
  },

  // Admin: fetch complete dashboard data (all slides, sections, offers, collections, products)
  async getAdminHomePage() {
    const res = await api.get('/admin/homepage');
    return res.data;
  },

  // --- SLIDER MANAGEMENT ---
  async createSlider(data) {
    const res = await api.post('/admin/homepage/sliders', data);
    return res.data;
  },

  async updateSlider(id, data) {
    const res = await api.put(`/admin/homepage/sliders/${id}`, data);
    return res.data;
  },

  async deleteSlider(id) {
    const res = await api.delete(`/admin/homepage/sliders/${id}`);
    return res.data;
  },

  async toggleSlider(id) {
    const res = await api.patch(`/admin/homepage/sliders/${id}/toggle`);
    return res.data;
  },

  async reorderSliders(orderedIds) {
    const res = await api.put('/admin/homepage/sliders/reorder', { orderedIds });
    return res.data;
  },

  // --- SECTION VISIBILITY & ORDER ---
  async updateSections(sections) {
    const res = await api.put('/admin/homepage/sections', { sections });
    return res.data;
  },

  async toggleSection(key) {
    const res = await api.patch(`/admin/homepage/sections/${key}/toggle`);
    return res.data;
  },

  // --- SPECIAL OFFERS ---
  async createOffer(data) {
    const res = await api.post('/admin/homepage/offers', data);
    return res.data;
  },

  async updateOffer(id, data) {
    const res = await api.put(`/admin/homepage/offers/${id}`, data);
    return res.data;
  },

  async deleteOffer(id) {
    const res = await api.delete(`/admin/homepage/offers/${id}`);
    return res.data;
  },

  async toggleOffer(id) {
    const res = await api.patch(`/admin/homepage/offers/${id}/toggle`);
    return res.data;
  },

  // --- COLLECTIONS (FEATURED, BESTSELLERS, NEW ARRIVALS) ---
  async updateCollections(data) {
    const res = await api.put('/admin/homepage/collections', data);
    return res.data;
  },

  // --- IMAGE UPLOAD ---
  async uploadBannerImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    const res = await api.post('/admin/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  }
};

