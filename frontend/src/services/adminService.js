import api from './api';

export const adminService = {
  async getDashboardStats() {
    const res = await api.get('/admin/dashboard/stats');
    return res.data;
  },

  async getAllProducts(params = {}) {
    const res = await api.get('/admin/products', { params });
    return res.data;
  },

  async createProduct(productData) {
    const res = await api.post('/admin/products', productData);
    return res.data;
  },

  async updateProduct(id, productData) {
    const res = await api.put(`/admin/products/${id}`, productData);
    return res.data;
  },

  async updateProductImage(id, data, isFormData = false) {
    const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
    const res = await api.patch(`/admin/products/${id}/image`, data, config);
    return res.data;
  },

  async getProductImages(id) {
    const res = await api.get(`/admin/products/${id}/images`);
    return res.data;
  },

  async updateProductImageIndex(id, index, data, isFormData = false) {
    const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
    const res = await api.put(`/admin/products/${id}/images/${index}`, data, config);
    return res.data;
  },

  async updateProduct3Images(id, data, isFormData = false) {
    const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
    const res = await api.put(`/admin/products/${id}/images`, data, config);
    return res.data;
  },

  async deleteProduct(id) {
    const res = await api.delete(`/admin/products/${id}`);
    return res.data;
  },

  async createCategory(catData) {
    const res = await api.post('/admin/categories', catData);
    return res.data;
  },

  async updateCategory(id, catData) {
    const res = await api.put(`/admin/categories/${id}`, catData);
    return res.data;
  },

  async deleteCategory(id) {
    const res = await api.delete(`/admin/categories/${id}`);
    return res.data;
  },

  async createBrand(brandData) {
    const res = await api.post('/admin/brands', brandData);
    return res.data;
  },

  async updateBrand(id, brandData) {
    const res = await api.put(`/admin/brands/${id}`, brandData);
    return res.data;
  },

  async deleteBrand(id) {
    const res = await api.delete(`/admin/brands/${id}`);
    return res.data;
  },

  async getAllOrders() {
    const res = await api.get('/admin/orders');
    return res.data;
  },

  async updateOrderStatus(orderId, status) {
    const res = await api.put(`/admin/orders/${orderId}/status`, { status });
    return res.data;
  },

  async getAllCustomers() {
    const res = await api.get('/admin/customers');
    return res.data;
  },

  async uploadImage(formData) {
    const res = await api.post('/admin/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data;
  }
};

