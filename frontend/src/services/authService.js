import api from './api';

export const authService = {
  async login(email, password) {
    const res = await api.post('/auth/login', { email, password });
    return res.data;
  },

  async adminLogin(email, password) {
    const res = await api.post('/auth/admin/login', { email, password });
    return res.data;
  },

  async register(userData) {
    const res = await api.post('/auth/register', userData);
    return res.data;
  },

  async getGoogleClientId() {
    const res = await api.get('/auth/google/client-id');
    return res.data?.clientId;
  },

  async googleLogin(credential) {
    const res = await api.post('/auth/google', { credential });
    return res.data;
  },

  async googleCodeLogin(code, redirectUri) {
    const res = await api.post('/auth/google/code', { code, redirectUri });
    return res.data;
  },

  async getMe() {
    const res = await api.get('/auth/me');
    return res.data;
  },

  async getAdminMe(adminToken) {
    const headers = adminToken ? { Authorization: `Bearer ${adminToken}` } : {};
    const res = await api.get('/auth/admin/me', { headers });
    return res.data;
  },

  async updateProfile(profileData) {
    const res = await api.put('/auth/profile', profileData);
    return res.data;
  }
};

