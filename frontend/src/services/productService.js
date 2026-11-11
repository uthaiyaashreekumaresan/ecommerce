import api from './api';

export const productService = {
  async getProducts(params = {}) {
    const res = await api.get('/products', { params });
    return res.data;
  },

  async getSuggestions(query) {
    const res = await api.get('/products/search/suggestions', { params: { q: query } });
    return res.data;
  },

  async getFeatured() {
    const res = await api.get('/products/featured');
    return res.data;
  },

  async getProductById(id) {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },

  async getProductImages(id) {
    const res = await api.get(`/products/${id}/images`);
    return res.data;
  },

  async getProductBySlug(slug) {
    const res = await api.get(`/products/slug/${slug}`);
    return res.data;
  },

  async getRelated(id, categoryId) {
    const res = await api.get(`/products/${id}/related`, { params: { categoryId } });
    return res.data;
  },

  async getCategories() {
    const res = await api.get('/categories');
    return res.data;
  },

  async getBrands() {
    const res = await api.get('/brands');
    return res.data;
  }
};

