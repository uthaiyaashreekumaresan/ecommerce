import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import { CheckCircleOutline, LocalShippingOutlined, DiamondOutlined } from '@mui/icons-material';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'ORD-2026-CONFIRMED';

  return (
    <div className="py-5" style={{ backgroundColor: '#F7F5FA', minHeight: '75vh' }}>
      <div className="container text-center">
        <div className="bg-white p-5 rounded border shadow-sm d-inline-block text-center" style={{ maxWidth: '560px', borderColor: '#E2DFEB' }}>
          <CheckCircleOutline sx={{ color: '#2e7d32', fontSize: 64, mb: 2 }} />

          <h2 className="fw-bold mb-2" style={{ fontFamily: 'Inter, sans-serif', color: '#292536' }}>
            Thank You For Your Order!
          </h2>

          <p className="text-muted mb-4" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
            Your artisanal perfume order has been received and is being prepared in our fragrance laboratory. A confirmation SMS & email have been dispatched.
          </p>

          {/* Order Pill */}
          <div className="p-3 rounded border mb-4" style={{ backgroundColor: '#F7F5FA', borderColor: '#E2DFEB' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#77708F', display: 'block' }}>
              Your Order Reference Number
            </span>
            <span className="fw-bold" style={{ fontSize: '1.2rem', color: '#292536', letterSpacing: '1px' }}>
              {orderNumber}
            </span>
          </div>

          <div className="d-flex align-items-center justify-content-center gap-2 text-muted mb-4" style={{ fontSize: '0.8rem' }}>
            <LocalShippingOutlined sx={{ color: '#77708F' }} />
            <span>Estimated delivery: 2–4 business days via Express Air</span>
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <Button
              variant="contained"
              component={Link}
              to="/orders"
              sx={{ backgroundColor: '#77708F', color: '#fff', '&:hover': { backgroundColor: '#645D7B' } }}
            >
              View Order History
            </Button>
            <Button
              variant="outlined"
              component={Link}
              to="/products"
              sx={{ borderColor: '#77708F', color: '#292536', '&:hover': { borderColor: '#645D7B', backgroundColor: 'rgba(119, 112, 143, 0.08)' } }}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

