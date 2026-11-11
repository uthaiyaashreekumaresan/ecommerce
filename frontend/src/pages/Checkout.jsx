import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import {
  Typography,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  CircularProgress,
  Alert,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Box
} from '@mui/material';
import {
  LocalShippingOutlined,
  PaymentOutlined,
  CheckCircleOutline,
  LockOutlined,
  DiamondOutlined
} from '@mui/icons-material';

const steps = ['Shipping Address', 'Payment Method', 'Review & Confirm'];

export default function Checkout() {
  const { cart, subtotal, discount, shippingFee, totalAmount, clearCart, promoCode } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Shipping Form State (pre-filled from user profile if logged in)
  const [formData, setFormData] = useState({
    customerName: user?.name || '',
    customerEmail: user?.email || '',
    customerPhone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    pincode: user?.pincode || '',
    paymentMethod: 'COD'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (activeStep === 0) {
      // Validate address
      const { customerName, customerEmail, customerPhone, address, city, state, pincode } = formData;
      if (!customerName || !customerEmail || !customerPhone || !address || !city || !state || !pincode) {
        setErrorMessage('Please complete all shipping address fields before proceeding.');
        return;
      }
    }
    setErrorMessage('');
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const orderPayload = {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        paymentMethod: formData.paymentMethod,
        subtotal,
        discount,
        shippingFee,
        totalAmount,
        items: cart.map((it) => ({
          productId: it.productId,
          productName: it.productName,
          size_ml: it.size_ml,
          price: it.price,
          quantity: it.quantity,
          imageUrl: it.imageUrl
        }))
      };

      const res = await orderService.checkout(orderPayload);
      if (res.success && res.data) {
        clearCart();
        navigate(`/order-success?orderId=${res.data.id}&orderNumber=${res.data.order_number}`);
      } else {
        setErrorMessage(res.message || 'Failed to place order. Please try again.');
      }
    } catch (err) {
      console.error('Order submission error:', err);
      setErrorMessage(err.response?.data?.message || 'Error processing your order. Please check details.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h4>No Items in Cart to Checkout</h4>
        <p className="text-muted">Please add perfumes to your shopping bag before proceeding.</p>
        <Button variant="contained" component={Link} to="/products" sx={{ backgroundColor: '#77708F', color: '#292536' }}>
          Browse Perfumes
        </Button>
      </div>
    );
  }

  return (
    <div className="py-5" style={{ backgroundColor: '#F7F5FA', minHeight: '80vh' }}>
      <div className="container">
        <div className="text-center mb-4">
          <DiamondOutlined sx={{ color: '#77708F', fontSize: 32 }} />
          <h2 className="fw-bold mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            Secure Checkout
          </h2>
        </div>

        {/* Stepper */}
        <Box sx={{ width: '100%', maxWidth: 700, margin: '0 auto 36px auto' }}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              '& .MuiStepIcon-root.Mui-active': { color: '#77708F' },
              '& .MuiStepIcon-root.Mui-completed': { color: '#292536' }
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {errorMessage && (
          <Alert severity="error" sx={{ maxWidth: 800, margin: '0 auto 24px auto' }}>
            {errorMessage}
          </Alert>
        )}

        <div className="row g-4 justify-content-center">
          {/* Main Checkout Step Content (col-lg-7) */}
          <div className="col-12 col-lg-7">
            <div className="bg-white p-4 rounded border shadow-sm" style={{ borderColor: '#E2DFEB' }}>
              {/* STEP 1: Shipping Address */}
              {activeStep === 0 && (
                <div>
                  <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
                    <LocalShippingOutlined sx={{ color: '#77708F' }} />
                    <h5 className="fw-bold mb-0" style={{ fontFamily: 'Inter, sans-serif' }}>
                      1. Delivery Address
                    </h5>
                  </div>

                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <TextField
                        fullWidth
                        size="small"
                        label="Full Name"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <TextField
                        fullWidth
                        size="small"
                        label="Email Address"
                        name="customerEmail"
                        type="email"
                        value={formData.customerEmail}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <TextField
                        fullWidth
                        size="small"
                        label="Phone Number (for Courier Tracking)"
                        name="customerPhone"
                        placeholder="+91 98000 00000"
                        value={formData.customerPhone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <TextField
                        fullWidth
                        size="small"
                        label="Street Address / Flat / Building"
                        name="address"
                        multiline
                        rows={2}
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-sm-4">
                      <TextField
                        fullWidth
                        size="small"
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-sm-4">
                      <TextField
                        fullWidth
                        size="small"
                        label="State"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-sm-4">
                      <TextField
                        fullWidth
                        size="small"
                        label="Pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-4">
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ backgroundColor: '#292536', color: '#fff', px: 4, '&:hover': { backgroundColor: '#000' } }}
                    >
                      Continue to Payment →
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 2: Payment Method */}
              {activeStep === 1 && (
                <div>
                  <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
                    <PaymentOutlined sx={{ color: '#77708F' }} />
                    <h5 className="fw-bold mb-0" style={{ fontFamily: 'Inter, sans-serif' }}>
                      2. Payment Method
                    </h5>
                  </div>

                  <FormControl component="fieldset" fullWidth>
                    <RadioGroup
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                    >
                      <div className="p-3 border rounded mb-2 bg-light d-flex align-items-center justify-content-between">
                        <FormControlLabel
                          value="COD"
                          control={<Radio sx={{ color: '#77708F', '&.Mui-checked': { color: '#77708F' } }} />}
                          label={
                            <div>
                              <strong style={{ fontSize: '0.9rem' }}>Cash on Delivery (COD)</strong>
                              <div className="text-muted" style={{ fontSize: '0.78rem' }}>Pay upon package arrival at your doorstep</div>
                            </div>
                          }
                        />
                        <span className="badge bg-secondary">Zero Fee</span>
                      </div>

                      <div className="p-3 border rounded mb-2 bg-light d-flex align-items-center justify-content-between">
                        <FormControlLabel
                          value="UPI"
                          control={<Radio sx={{ color: '#77708F', '&.Mui-checked': { color: '#77708F' } }} />}
                          label={
                            <div>
                              <strong style={{ fontSize: '0.9rem' }}>UPI (Google Pay, PhonePe, Paytm, BHIM)</strong>
                              <div className="text-muted" style={{ fontSize: '0.78rem' }}>Fast instant payment verification</div>
                            </div>
                          }
                        />
                        <span className="badge bg-success">Instant</span>
                      </div>

                      <div className="p-3 border rounded mb-2 bg-light d-flex align-items-center justify-content-between">
                        <FormControlLabel
                          value="Card"
                          control={<Radio sx={{ color: '#77708F', '&.Mui-checked': { color: '#77708F' } }} />}
                          label={
                            <div>
                              <strong style={{ fontSize: '0.9rem' }}>Credit / Debit Card</strong>
                              <div className="text-muted" style={{ fontSize: '0.78rem' }}>Visa, MasterCard, RuPay, Amex</div>
                            </div>
                          }
                        />
                        <span className="badge bg-primary">Secure 256-bit</span>
                      </div>

                      <div className="p-3 border rounded mb-2 bg-light d-flex align-items-center justify-content-between">
                        <FormControlLabel
                          value="NetBanking"
                          control={<Radio sx={{ color: '#77708F', '&.Mui-checked': { color: '#77708F' } }} />}
                          label={
                            <div>
                              <strong style={{ fontSize: '0.9rem' }}>Net Banking</strong>
                              <div className="text-muted" style={{ fontSize: '0.78rem' }}>All Indian Banks supported</div>
                            </div>
                          }
                        />
                      </div>
                    </RadioGroup>
                  </FormControl>

                  <div className="d-flex justify-content-between mt-4">
                    <Button variant="outlined" onClick={handleBack} color="inherit">
                      ← Back
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ backgroundColor: '#292536', color: '#fff', px: 4, '&:hover': { backgroundColor: '#000' } }}
                    >
                      Review Order →
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 3: Review & Confirm */}
              {activeStep === 2 && (
                <div>
                  <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
                    <CheckCircleOutline sx={{ color: '#77708F' }} />
                    <h5 className="fw-bold mb-0" style={{ fontFamily: 'Inter, sans-serif' }}>
                      3. Review Order & Confirm
                    </h5>
                  </div>

                  <div className="p-3 bg-light rounded mb-3 border">
                    <h6 className="fw-bold mb-2" style={{ fontSize: '0.85rem' }}>Shipping Details:</h6>
                    <div style={{ fontSize: '0.82rem', color: '#444' }}>
                      <strong>{formData.customerName}</strong> ({formData.customerPhone})<br />
                      {formData.address}, {formData.city}, {formData.state} - {formData.pincode}<br />
                      Email: {formData.customerEmail}
                    </div>
                  </div>

                  <div className="p-3 bg-light rounded mb-4 border">
                    <h6 className="fw-bold mb-1" style={{ fontSize: '0.85rem' }}>Payment Method:</h6>
                    <div style={{ fontSize: '0.82rem', color: '#444' }}>
                      {formData.paymentMethod === 'COD' && 'Cash on Delivery (Pay cash/UPI at delivery)'}
                      {formData.paymentMethod === 'UPI' && 'UPI Instant Payment'}
                      {formData.paymentMethod === 'Card' && 'Credit / Debit Card'}
                      {formData.paymentMethod === 'NetBanking' && 'Net Banking Transfer'}
                    </div>
                  </div>

                  <div className="d-flex justify-content-between mt-4">
                    <Button variant="outlined" onClick={handleBack} color="inherit" disabled={loading}>
                      ← Back
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handlePlaceOrder}
                      disabled={loading}
                      sx={{
                        backgroundColor: '#77708F',
                        color: '#292536',
                        fontWeight: 700,
                        px: 4,
                        py: 1.2,
                        '&:hover': { backgroundColor: '#645D7B' }
                      }}
                    >
                      {loading ? <CircularProgress size={24} sx={{ color: '#292536' }} /> : 'Place Order Now'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Summary Sidebar (col-lg-4) */}
          <div className="col-12 col-lg-4">
            <div className="bg-white p-4 rounded border shadow-sm" style={{ borderColor: '#E2DFEB' }}>
              <h6 className="fw-bold mb-3 pb-2 border-bottom" style={{ fontFamily: 'Inter, sans-serif' }}>
                Your Perfumes ({cart.length})
              </h6>

              <div className="mb-3 max-height-300 overflow-auto">
                {cart.map((it) => (
                  <div key={`${it.productId}-${it.size_ml}`} className="d-flex align-items-center gap-3 mb-2 pb-2 border-bottom">
                    <img
                      src={it.imageUrl}
                      alt=""
                      style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                    <div className="flex-grow-1" style={{ fontSize: '0.8rem' }}>
                      <div className="fw-bold text-truncate" style={{ maxWidth: 160 }}>{it.productName}</div>
                      <div className="text-muted">{it.size_ml}ml • Qty: {it.quantity}</div>
                    </div>
                    <div className="fw-bold" style={{ fontSize: '0.85rem' }}>
                      ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.85rem' }}>
                <span className="text-muted">Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discount > 0 && (
                <div className="d-flex justify-content-between mb-1 text-success" style={{ fontSize: '0.85rem' }}>
                  <span>Discount</span>
                  <span>- ₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="d-flex justify-content-between mb-2" style={{ fontSize: '0.85rem' }}>
                <span className="text-muted">Delivery</span>
                <span>{shippingFee === 0 ? <strong className="text-success">FREE</strong> : `₹${shippingFee}`}</span>
              </div>

              <Divider sx={{ my: 1.5 }} />

              <div className="d-flex justify-content-between align-items-baseline mb-3">
                <span className="fw-bold">Total Payable</span>
                <span className="fw-bold" style={{ fontSize: '1.25rem', color: '#292536' }}>
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: '0.72rem' }}>
                <LockOutlined sx={{ fontSize: 16 }} />
                <span>SSL 256-Bit Encrypted Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
