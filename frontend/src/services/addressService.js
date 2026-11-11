import api from './api';

export const addressService = {
  async getMyAddresses() {
    const res = await api.get('/addresses');
    return res.data;
  },

  async addAddress(addressData) {
    const res = await api.post('/addresses', addressData);
    return res.data;
  },

  async updateAddress(id, addressData) {
    const res = await api.put(`/addresses/${id}`, addressData);
    return res.data;
  },

  async deleteAddress(id) {
    const res = await api.delete(`/addresses/${id}`);
    return res.data;
  },

  async setDefaultAddress(id) {
    const res = await api.patch(`/addresses/${id}/default`);
    return res.data;
  }
};

