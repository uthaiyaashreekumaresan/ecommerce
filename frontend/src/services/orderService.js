import api from './api';

export const orderService = {
  async checkout(orderData) {
    const res = await api.post('/orders/checkout', orderData);
    return res.data;
  },

  async getMyOrders() {
    const res = await api.get('/orders/my-orders');
    return res.data;
  },

  async getOrderById(id) {
    const res = await api.get(`/orders/${id}`);
    return res.data;
  }
};

