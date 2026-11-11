import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Authorization Bearer token to outgoing requests based on endpoint role
api.interceptors.request.use(
  (config) => {
    const isAdminReq = config.url && (config.url.startsWith('/admin') || config.url.includes('/admin/'));
    const adminToken = localStorage.getItem('perfume_admin_token');
    const customerToken = localStorage.getItem('perfume_token');

    if (isAdminReq && adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    } else if (customerToken) {
      config.headers.Authorization = `Bearer ${customerToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token if invalid or expired
      // Do not redirect forcefully if user was browsing public catalog
    }
    return Promise.reject(error);
  }
);

export default api;

