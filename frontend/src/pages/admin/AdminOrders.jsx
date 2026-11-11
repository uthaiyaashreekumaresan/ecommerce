import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import {
  Typography,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
  Chip,
  Box
} from '@mui/material';
import { Visibility, LocalShipping, CheckCircle, Cancel, Schedule } from '@mui/icons-material';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [toast, setToast] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await adminService.getAllOrders();
      if (res.success) {
        setOrders(res.data);
      }
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await adminService.updateOrderStatus(orderId, newStatus);
      if (res.success) {
        setToast(`Order updated to "${newStatus}".`);
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, order_status: newStatus } : o))
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Error updating order status');
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (statusFilter === 'all') return true;
    return o.order_status === statusFilter;
  });

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <h3 className="fw-bold mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            Customer Orders & Fulfillment
          </h3>
          <Typography variant="body2" color="text.secondary">
            Process incoming orders, dispatch tracking, and delivery confirmations
          </Typography>
        </div>

        {/* Filter by Status */}
        <div className="d-flex gap-2 mt-3 mt-md-0">
          {['all', 'placed', 'shipped', 'delivered', 'cancelled'].map((st) => (
            <Chip
              key={st}
              label={st.toUpperCase()}
              clickable
              onClick={() => setStatusFilter(st)}
              color={statusFilter === st ? 'primary' : 'default'}
              size="small"
              sx={{ fontWeight: statusFilter === st ? 700 : 400 }}
            />
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded border shadow-sm" style={{ borderColor: '#E2DFEB' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#77708F' }} />
          </Box>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.85rem' }}>
              <thead className="table-light">
                <tr>
                  <th>Order #</th>
                  <th>Date</th>
                  <th>Customer Info</th>
                  <th>Items</th>
                  <th>Total Amount</th>
                  <th>Payment</th>
                  <th>Fulfillment Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted">No orders found.</td>
                  </tr>
                ) : (
                  filteredOrders.map((o) => (
                    <tr key={o.id}>
                      <td className="fw-bold">{o.order_number}</td>
                      <td>
                        {new Date(o.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td>
                        <div className="fw-semibold">{o.customer_name}</div>
                        <small className="text-muted">{o.customer_phone} • {o.shipping_city}</small>
                      </td>
                      <td>{o.items ? `${o.items.length} items` : '1 item'}</td>
                      <td className="fw-bold">₹{Number(o.total_amount).toLocaleString('en-IN')}</td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          {o.payment_method} ({o.payment_status})
                        </span>
                      </td>
                      <td>
                        <Select
                          size="small"
                          value={o.order_status}
                          onChange={(e) => handleStatusChange(o.id, e.target.value)}
                          sx={{
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            height: '32px',
                            backgroundColor:
                              o.order_status === 'delivered' ? '#e8f5e9' :
                              o.order_status === 'shipped' ? '#fff3e0' :
                              o.order_status === 'cancelled' ? '#ffebee' : '#e3f2fd',
                            color:
                              o.order_status === 'delivered' ? '#2e7d32' :
                              o.order_status === 'shipped' ? '#e65100' :
                              o.order_status === 'cancelled' ? '#c62828' : '#1565c0'
                          }}
                        >
                          <MenuItem value="placed">Placed</MenuItem>
                          <MenuItem value="shipped">Shipped</MenuItem>
                          <MenuItem value="delivered">Delivered</MenuItem>
                          <MenuItem value="cancelled">Cancelled</MenuItem>
                        </Select>
                      </td>
                      <td>
                        <Button
                          size="small"
                          startIcon={<Visibility />}
                          onClick={() => setSelectedOrder(o)}
                          sx={{ fontSize: '0.75rem', color: '#292536' }}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ORDER DETAILS MODAL */}
      <Dialog open={Boolean(selectedOrder)} onClose={() => setSelectedOrder(null)} maxWidth="sm" fullWidth>
        {selectedOrder && (
          <div>
            <DialogTitle sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Order Details: {selectedOrder.order_number}
            </DialogTitle>
            <DialogContent dividers>
              {/* Shipping info */}
              <div className="p-3 bg-light rounded border mb-3">
                <h6 className="fw-bold mb-1" style={{ fontSize: '0.85rem' }}>Shipping & Customer:</h6>
                <div style={{ fontSize: '0.82rem', color: '#444' }}>
                  <strong>{selectedOrder.customer_name}</strong><br />
                  Email: {selectedOrder.customer_email}<br />
                  Phone: {selectedOrder.customer_phone}<br />
                  Address: {selectedOrder.shipping_address}, {selectedOrder.shipping_city}, {selectedOrder.shipping_state} - {selectedOrder.shipping_pincode}
                </div>
              </div>

              {/* Items List */}
              <h6 className="fw-bold mb-2" style={{ fontSize: '0.85rem' }}>Purchased Perfumes:</h6>
              <div className="d-flex flex-column gap-2 mb-3">
                {selectedOrder.items && selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="d-flex align-items-center justify-content-between p-2 border rounded">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={it.image_url || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=200&q=80'}
                        alt=""
                        style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <div>
                        <div className="fw-bold" style={{ fontSize: '0.85rem' }}>{it.product_name}</div>
                        <small className="text-muted">{it.size_ml}ml • Qty: {it.quantity}</small>
                      </div>
                    </div>
                    <div className="fw-bold" style={{ fontSize: '0.9rem' }}>
                      ₹{Number(it.total_price || it.price * it.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Summary */}
              <div className="p-3 bg-light rounded border" style={{ fontSize: '0.85rem' }}>
                <div className="d-flex justify-content-between mb-1">
                  <span>Subtotal:</span>
                  <span>₹{Number(selectedOrder.subtotal).toLocaleString('en-IN')}</span>
                </div>
                {Number(selectedOrder.discount) > 0 && (
                  <div className="d-flex justify-content-between mb-1 text-success">
                    <span>Discount:</span>
                    <span>- ₹{Number(selectedOrder.discount).toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping Fee:</span>
                  <span>{Number(selectedOrder.shipping_fee) === 0 ? 'FREE' : `₹${selectedOrder.shipping_fee}`}</span>
                </div>
                <div className="d-flex justify-content-between fw-bold pt-2 border-top">
                  <span>Total Amount Paid:</span>
                  <span style={{ color: '#292536' }}>₹{Number(selectedOrder.total_amount).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setSelectedOrder(null)} color="inherit">Close</Button>
            </DialogActions>
          </div>
        )}
      </Dialog>

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
        message={toast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </div>
  );
}
