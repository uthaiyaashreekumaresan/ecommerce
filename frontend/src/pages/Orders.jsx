import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import {
  Typography,
  CircularProgress,
  Chip,
  Button,
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  LocalShippingOutlined,
  ShoppingBagOutlined,
  CheckCircle,
  Schedule,
  Cancel,
  Inventory2Outlined,
  VisibilityOutlined,
  Close,
  TwoWheelerOutlined,
  PlaceOutlined,
  ReceiptLongOutlined,
  DiamondOutlined,
  PrintOutlined
} from '@mui/icons-material';

// 5 Primary Tracking Stages
const TRACKING_STEPS = [
  { key: 'placed', label: 'Order Placed', desc: 'Received & Verified' },
  { key: 'confirmed', label: 'Confirmed', desc: 'Prepared in Atelier' },
  { key: 'shipped', label: 'Shipped', desc: 'In Transit with Courier' },
  { key: 'out_for_delivery', label: 'Out for Delivery', desc: 'Arriving Today' },
  { key: 'delivered', label: 'Delivered', desc: 'Safely Handed Over' }
];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await orderService.getMyOrders();
        if (res.success && Array.isArray(res.data)) {
          setOrders(res.data);
        }
      } catch (err) {
        console.error('Failed to load user orders:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const getActiveStepIndex = (status) => {
    const s = String(status || '').toLowerCase();
    if (s === 'delivered') return 4;
    if (s === 'out_for_delivery' || s === 'out for delivery') return 3;
    if (s === 'shipped') return 2;
    if (s === 'confirmed') return 1;
    if (s === 'placed' || s === 'pending') return 0;
    if (s === 'cancelled') return -1;
    return 0;
  };

  const getStatusBadge = (status) => {
    const s = String(status || '').toLowerCase();
    switch (s) {
      case 'pending':
      case 'placed':
        return (
          <Chip
            label="Pending / Placed"
            size="small"
            icon={<Schedule sx={{ fontSize: '15px !important' }} />}
            sx={{ backgroundColor: '#EEF2FF', color: '#3730A3', fontWeight: 600, border: '1px solid #C7D2FE' }}
          />
        );
      case 'confirmed':
        return (
          <Chip
            label="Confirmed"
            size="small"
            icon={<CheckCircle sx={{ fontSize: '15px !important' }} />}
            sx={{ backgroundColor: '#F0FDF4', color: '#166534', fontWeight: 600, border: '1px solid #BBF7D0' }}
          />
        );
      case 'shipped':
        return (
          <Chip
            label="Shipped / In Transit"
            size="small"
            icon={<LocalShippingOutlined sx={{ fontSize: '15px !important' }} />}
            sx={{ backgroundColor: '#FFF7ED', color: '#9A3412', fontWeight: 600, border: '1px solid #FED7AA' }}
          />
        );
      case 'out_for_delivery':
      case 'out for delivery':
        return (
          <Chip
            label="Out for Delivery"
            size="small"
            icon={<TwoWheelerOutlined sx={{ fontSize: '15px !important' }} />}
            sx={{ backgroundColor: '#FAF5FF', color: '#6B21A8', fontWeight: 600, border: '1px solid #E9D5FF' }}
          />
        );
      case 'delivered':
        return (
          <Chip
            label="Delivered"
            size="small"
            icon={<CheckCircle sx={{ fontSize: '15px !important' }} />}
            sx={{ backgroundColor: '#ECFDF5', color: '#065F46', fontWeight: 700, border: '1px solid #A7F3D0' }}
          />
        );
      case 'cancelled':
        return (
          <Chip
            label="Cancelled"
            size="small"
            icon={<Cancel sx={{ fontSize: '15px !important' }} />}
            sx={{ backgroundColor: '#FEF2F2', color: '#991B1B', fontWeight: 600, border: '1px solid #FECACA' }}
          />
        );
      default:
        return <Chip label={status || 'Processing'} size="small" sx={{ textTransform: 'capitalize' }} />;
    }
  };

  const handleOpenDetails = (order) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 14 }}>
        <CircularProgress sx={{ color: '#77708F', mb: 2 }} />
        <Typography variant="body2" sx={{ color: '#77708F', letterSpacing: '1px' }}>
          LOADING ORDERS & TRACKING...
        </Typography>
      </Box>
    );
  }

  return (
    <div className="py-4 py-md-5" style={{ backgroundColor: '#F7F5FA', minHeight: '82vh' }}>
      <div className="container-fluid px-3 px-md-4 px-xl-5" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Breadcrumb Header */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb" style={{ fontSize: '0.82rem' }}>
            <li className="breadcrumb-item"><Link to="/" className="text-muted text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/account" className="text-muted text-decoration-none">Account</Link></li>
            <li className="breadcrumb-item active" aria-current="page" style={{ color: '#77708F', fontWeight: 600 }}>
              Orders & Tracking
            </li>
          </ol>
        </nav>

        {/* Title Banner */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-4 pb-3 border-bottom" style={{ borderColor: '#ECE9F1' }}>
          <div>
            <div className="d-flex align-items-center gap-2">
              <h2 className="fw-bold mb-0" style={{ fontFamily: 'Inter, sans-serif', color: '#292536' }}>
                Orders & Tracking
              </h2>
              <Chip
                label={`${orders.length} ${orders.length === 1 ? 'Order' : 'Orders'}`}
                size="small"
                sx={{
                  backgroundColor: 'rgba(119, 112, 143, 0.14)',
                  color: '#77708F',
                  fontWeight: 700,
                  fontSize: '0.75rem'
                }}
              />
            </div>
            <p className="text-muted small mb-0 mt-1">
              View your previous orders, real-time shipment tracking, and full invoice receipts.
            </p>
          </div>

          <Button
            component={Link}
            to="/products"
            variant="outlined"
            size="small"
            startIcon={<ShoppingBagOutlined />}
            sx={{
              borderColor: '#77708F',
              color: '#292536',
              borderRadius: '20px',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.82rem',
              '&:hover': { borderColor: '#292536', backgroundColor: '#EDE8F5' }
            }}
          >
            Explore Fragrances
          </Button>
        </div>

        {/* Orders Listing */}
        {orders.length === 0 ? (
          <div className="bg-white p-5 text-center rounded-4 border shadow-sm" style={{ borderColor: '#E2DFEB' }}>
            <div
              className="d-inline-flex align-items-center justify-content-center mb-3"
              style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#F3F0F9', color: '#77708F' }}
            >
              <ShoppingBagOutlined sx={{ fontSize: 40 }} />
            </div>
            <h4 className="fw-bold mb-2" style={{ color: '#292536' }}>No Orders Found</h4>
            <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '480px', fontSize: '0.9rem', lineHeight: 1.6 }}>
              You have not placed any orders yet. Discover our curated Haute Parfumerie creations and indulge in unforgettable signature fragrances.
            </p>
            <Button
              variant="contained"
              component={Link}
              to="/products"
              sx={{
                backgroundColor: '#77708F',
                color: '#ffffff',
                fontWeight: 700,
                borderRadius: '25px',
                px: 4,
                py: 1.2,
                '&:hover': { backgroundColor: '#5f5773' }
              }}
            >
              Discover Fragrances
            </Button>
          </div>
        ) : (
          <div className="d-flex flex-column gap-4">
            {orders.map((order) => {
              const activeIndex = getActiveStepIndex(order.order_status);
              const isCancelled = String(order.order_status).toLowerCase() === 'cancelled';
              const awbNumber = `ELX-${String(order.order_number || order.id).replace(/[^0-9]/g, '').slice(-6) || '98101'}-IN`;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3 border shadow-sm overflow-hidden"
                  style={{ borderColor: '#E2DFEB', transition: 'box-shadow 0.2s ease' }}
                >
                  {/* Order Card Header */}
                  <div className="p-3 p-md-4 bg-light border-bottom d-flex flex-wrap justify-content-between align-items-center gap-3">
                    <div className="d-flex flex-wrap align-items-center gap-4">
                      <div>
                        <span style={{ fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#77708F', fontWeight: 600 }}>
                          ORDER ID
                        </span>
                        <div className="fw-bold" style={{ fontSize: '0.98rem', color: '#292536', fontFamily: 'monospace' }}>
                          {order.order_number}
                        </div>
                      </div>

                      <div>
                        <span style={{ fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#77708F', fontWeight: 600 }}>
                          DATE PLACED
                        </span>
                        <div className="fw-semibold" style={{ fontSize: '0.88rem', color: '#292536' }}>
                          {new Date(order.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      </div>

                      <div>
                        <span style={{ fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#77708F', fontWeight: 600 }}>
                          TOTAL AMOUNT
                        </span>
                        <div className="fw-bold" style={{ fontSize: '1.05rem', color: '#292536' }}>
                          ₹{Number(order.total_amount).toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      {getStatusBadge(order.order_status)}
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleOpenDetails(order)}
                        startIcon={<VisibilityOutlined />}
                        sx={{
                          borderColor: '#77708F',
                          color: '#292536',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          borderRadius: '20px',
                          textTransform: 'none',
                          ml: 1,
                          '&:hover': { backgroundColor: '#EDE8F5', borderColor: '#292536' }
                        }}
                      >
                        View Order Details
                      </Button>
                    </div>
                  </div>

                  {/* Real-time Order Tracking Stepper */}
                  {!isCancelled && (
                    <div className="p-3 p-md-4 border-bottom" style={{ backgroundColor: '#FCFBFD' }}>
                      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-3">
                        <div className="d-flex align-items-center gap-2">
                          <LocalShippingOutlined sx={{ color: '#77708F', fontSize: 20 }} />
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#292536', letterSpacing: '0.5px' }}>
                            LIVE SHIPMENT TRACKING
                          </span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#555' }}>
                          Carrier: <strong style={{ color: '#292536' }}>Élixir Express Luxury Courier</strong> • AWB:{' '}
                          <code style={{ color: '#77708F', fontWeight: 700 }}>{awbNumber}</code>
                        </div>
                      </div>

                      {/* Stepper Bar */}
                      <Box sx={{ width: '100%', py: 1 }}>
                        <Stepper
                          activeStep={activeIndex}
                          alternativeLabel={!isMobile}
                          orientation={isMobile ? 'vertical' : 'horizontal'}
                          sx={{
                            '& .MuiStepIcon-root.Mui-active': { color: '#77708F' },
                            '& .MuiStepIcon-root.Mui-completed': { color: '#166534' }
                          }}
                        >
                          {TRACKING_STEPS.map((step, idx) => {
                            const isCompleted = activeIndex > idx;
                            const isCurrent = activeIndex === idx;

                            return (
                              <Step key={step.key} completed={isCompleted}>
                                <StepLabel
                                  optional={
                                    <Typography variant="caption" sx={{ color: '#77708F', fontSize: '0.72rem', display: 'block' }}>
                                      {step.desc}
                                    </Typography>
                                  }
                                >
                                  <span
                                    style={{
                                      fontSize: '0.82rem',
                                      fontWeight: isCurrent || isCompleted ? 700 : 500,
                                      color: isCurrent ? '#292536' : isCompleted ? '#166534' : '#888'
                                    }}
                                  >
                                    {step.label}
                                  </span>
                                </StepLabel>
                              </Step>
                            );
                          })}
                        </Stepper>
                      </Box>
                    </div>
                  )}

                  {/* Cancelled Alert if applicable */}
                  {isCancelled && (
                    <div className="p-3 bg-danger bg-opacity-10 border-bottom text-danger d-flex align-items-center gap-2">
                      <Cancel fontSize="small" />
                      <span style={{ fontSize: '0.84rem', fontWeight: 600 }}>
                        This order was cancelled. Any online payment made has been reversed to your original payment method.
                      </span>
                    </div>
                  )}

                  {/* Product Details Section */}
                  <div className="p-3 p-md-4">
                    <div style={{ fontSize: '0.76rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#77708F', fontWeight: 700, marginBottom: '12px' }}>
                      ORDERED ITEMS ({order.items ? order.items.length : 0})
                    </div>

                    <div className="d-flex flex-column gap-3">
                      {order.items &&
                        order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 p-2.5 rounded-2"
                            style={{ backgroundColor: '#FAF9FD', border: '1px solid #ECE9F2' }}
                          >
                            <div className="d-flex align-items-center gap-3">
                              <img
                                src={
                                  item.image_url ||
                                  'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=400&q=80'
                                }
                                alt={item.product_name}
                                style={{
                                  width: '64px',
                                  height: '64px',
                                  objectFit: 'cover',
                                  borderRadius: '6px',
                                  border: '1px solid #E2DFEB',
                                  backgroundColor: '#fff'
                                }}
                              />
                              <div>
                                <div className="fw-bold" style={{ fontSize: '0.94rem', color: '#292536' }}>
                                  {item.product_name}
                                </div>
                                <div className="d-flex align-items-center gap-2 mt-1">
                                  <span
                                    className="badge"
                                    style={{
                                      backgroundColor: '#F3F0F9',
                                      color: '#292536',
                                      border: '1px solid #E2DFEB',
                                      fontSize: '0.7rem',
                                      fontWeight: 600
                                    }}
                                  >
                                    {item.size_ml || 50}ml Flacon
                                  </span>
                                  <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                                    Qty: <strong>{item.quantity}</strong>
                                  </span>
                                  <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                                    • Unit: ₹{Number(item.price).toLocaleString('en-IN')}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="text-sm-end w-100 w-sm-auto pt-2 pt-sm-0 border-top border-sm-0">
                              <span style={{ fontSize: '0.72rem', color: '#77708F', textTransform: 'uppercase' }} className="d-block">
                                Subtotal
                              </span>
                              <span className="fw-bold" style={{ fontSize: '1.02rem', color: '#292536' }}>
                                ₹{Number(item.total_price || item.price * item.quantity).toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Shipping & Delivery Address Bar */}
                  <div className="p-3 bg-light border-top d-flex flex-wrap justify-content-between align-items-center gap-2" style={{ fontSize: '0.82rem', color: '#555' }}>
                    <div>
                      <PlaceOutlined sx={{ fontSize: 16, color: '#77708F', mr: 0.5, verticalAlign: 'text-bottom' }} />
                      <strong>Delivery to:</strong> {order.customer_name} — {order.shipping_address}, {order.shipping_city}, {order.shipping_state} - {order.shipping_pincode}
                    </div>
                    <div>
                      <span className="text-muted">Payment: </span>
                      <strong style={{ color: '#292536' }}>{order.payment_method}</strong> ({order.payment_status || 'Paid'})
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View Order Details Modal / Dialog */}
        <Dialog
          open={detailsOpen}
          onClose={handleCloseDetails}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '16px',
              p: { xs: 1, md: 2 }
            }
          }}
        >
          {selectedOrder && (
            <>
              <DialogTitle className="d-flex justify-content-between align-items-center pb-2 border-bottom">
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <ReceiptLongOutlined sx={{ color: '#77708F' }} />
                    <span className="fw-bold" style={{ fontFamily: 'Inter, sans-serif', color: '#292536', fontSize: '1.2rem' }}>
                      Invoice Receipt #{selectedOrder.order_number}
                    </span>
                  </div>
                  <Typography variant="caption" sx={{ color: '#77708F', display: 'block', mt: 0.5 }}>
                    Placed on {new Date(selectedOrder.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Typography>
                </div>
                <IconButton onClick={handleCloseDetails} size="small">
                  <Close />
                </IconButton>
              </DialogTitle>

              <DialogContent className="pt-4">
                {/* Status and AWB Banner */}
                <div className="p-3 rounded-3 mb-4 d-flex flex-wrap justify-content-between align-items-center gap-2" style={{ backgroundColor: '#F4F1F8', border: '1px solid #DFDBE7' }}>
                  <div className="d-flex align-items-center gap-2">
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#292536' }}>Order Status:</span>
                    {getStatusBadge(selectedOrder.order_status)}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#555' }}>
                    Logistics Partner: <strong>Élixir Express Air Courier</strong>
                  </div>
                </div>

                {/* Grid: Shipping & Payment info */}
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <div className="p-3 rounded border h-100" style={{ borderColor: '#ECE9F1', backgroundColor: '#FAFAFD' }}>
                      <div className="fw-bold mb-2 text-uppercase" style={{ fontSize: '0.74rem', letterSpacing: '1px', color: '#77708F' }}>
                        SHIPPING & RECIPIENT
                      </div>
                      <div className="fw-bold" style={{ fontSize: '0.92rem', color: '#292536' }}>
                        {selectedOrder.customer_name}
                      </div>
                      <div style={{ fontSize: '0.84rem', color: '#555', marginTop: '4px' }}>
                        {selectedOrder.shipping_address}<br />
                        {selectedOrder.shipping_city}, {selectedOrder.shipping_state} - {selectedOrder.shipping_pincode}
                      </div>
                      <div className="mt-2 text-muted" style={{ fontSize: '0.8rem' }}>
                        Phone: {selectedOrder.customer_phone}<br />
                        Email: {selectedOrder.customer_email}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="p-3 rounded border h-100" style={{ borderColor: '#ECE9F1', backgroundColor: '#FAFAFD' }}>
                      <div className="fw-bold mb-2 text-uppercase" style={{ fontSize: '0.74rem', letterSpacing: '1px', color: '#77708F' }}>
                        PAYMENT SUMMARY
                      </div>
                      <div style={{ fontSize: '0.84rem', color: '#555' }}>
                        Method: <strong style={{ color: '#292536' }}>{selectedOrder.payment_method}</strong>
                      </div>
                      <div style={{ fontSize: '0.84rem', color: '#555', marginTop: '2px' }}>
                        Payment Status:{' '}
                        <span className="badge bg-success bg-opacity-75 ms-1" style={{ fontSize: '0.72rem' }}>
                          {selectedOrder.payment_status || 'Paid'}
                        </span>
                      </div>
                      <div className="mt-3 pt-2 border-top" style={{ fontSize: '0.82rem', color: '#777' }}>
                        Fulfilled directly by <strong>ÉLIXIR PARFUMS</strong> Central Fragrance Atelier, Grasse / Chennai.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Itemized Table */}
                <div className="mb-4">
                  <div className="fw-bold mb-2 text-uppercase" style={{ fontSize: '0.74rem', letterSpacing: '1px', color: '#77708F' }}>
                    ITEMIZED BREAKDOWN
                  </div>
                  <div className="table-responsive">
                    <table className="table table-bordered align-middle mb-0" style={{ fontSize: '0.86rem' }}>
                      <thead style={{ backgroundColor: '#F8F7FB' }}>
                        <tr>
                          <th>Fragrance</th>
                          <th>Size</th>
                          <th className="text-center">Qty</th>
                          <th className="text-end">Unit Price</th>
                          <th className="text-end">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.items &&
                          selectedOrder.items.map((item, i) => (
                            <tr key={i}>
                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  <img
                                    src={item.image_url || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=400&q=80'}
                                    alt={item.product_name}
                                    style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                                  />
                                  <span className="fw-semibold">{item.product_name}</span>
                                </div>
                              </td>
                              <td>{item.size_ml || 50}ml</td>
                              <td className="text-center">{item.quantity}</td>
                              <td className="text-end">₹{Number(item.price).toLocaleString('en-IN')}</td>
                              <td className="text-end fw-bold">
                                ₹{Number(item.total_price || item.price * item.quantity).toLocaleString('en-IN')}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Price Calculation Card */}
                <div className="d-flex justify-content-end">
                  <div style={{ width: '100%', maxWidth: '320px' }}>
                    <div className="d-flex justify-content-between py-1" style={{ fontSize: '0.86rem', color: '#555' }}>
                      <span>Subtotal:</span>
                      <span>₹{Number(selectedOrder.subtotal || selectedOrder.total_amount).toLocaleString('en-IN')}</span>
                    </div>
                    {Number(selectedOrder.discount) > 0 && (
                      <div className="d-flex justify-content-between py-1 text-success" style={{ fontSize: '0.86rem' }}>
                        <span>Privilege Discount:</span>
                        <span>-₹{Number(selectedOrder.discount).toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="d-flex justify-content-between py-1" style={{ fontSize: '0.86rem', color: '#555' }}>
                      <span>Express Fragrance Shipping:</span>
                      <span className="text-success fw-semibold">FREE</span>
                    </div>
                    <Divider sx={{ my: 1 }} />
                    <div className="d-flex justify-content-between py-1" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#292536' }}>
                      <span>Grand Total:</span>
                      <span>₹{Number(selectedOrder.total_amount).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </DialogContent>

              <DialogActions className="px-4 pb-3 border-top">
                <Button
                  onClick={() => window.print()}
                  startIcon={<PrintOutlined />}
                  sx={{ color: '#77708F', fontWeight: 600, textTransform: 'none' }}
                >
                  Print Invoice
                </Button>
                <Button
                  onClick={handleCloseDetails}
                  variant="contained"
                  sx={{
                    backgroundColor: '#77708F',
                    color: '#ffffff',
                    fontWeight: 600,
                    borderRadius: '20px',
                    px: 3,
                    textTransform: 'none',
                    '&:hover': { backgroundColor: '#5f5773' }
                  }}
                >
                  Close
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </div>
    </div>
  );
}
