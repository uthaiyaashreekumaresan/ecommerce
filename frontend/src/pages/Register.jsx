import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleAuthButton from '../components/GoogleAuthButton';
import {
  TextField,
  Button,
  Alert,
  CircularProgress,
  Typography,
  Box,
  Divider
} from '@mui/material';
import { DiamondOutlined } from '@mui/icons-material';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5" style={{ backgroundColor: '#F7F5FA', minHeight: '80vh' }}>
      <div className="container d-flex justify-content-center">
        <div className="bg-white p-4 p-md-5 rounded border shadow-sm" style={{ width: '100%', maxWidth: '520px', borderColor: '#E2DFEB' }}>
          <div className="text-center mb-4">
            <Link to="/" className="d-inline-block text-decoration-none mb-3">
              <img
                src="/images/elixir-parfums-logo.jpg"
                alt="Élixir Parfums - Haute Parfumerie"
                style={{
                  height: '68px',
                  width: 'auto',
                  maxWidth: '270px',
                  objectFit: 'contain',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </Link>
            <h3 className="fw-bold mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
              Create Account
            </h3>
            <Typography variant="body2" color="text.secondary">
              Join the Élixir Circle for exclusive fragrances & seamless checkout
            </Typography>
          </div>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          {/* Sign up with Google */}
          <div className="mb-3">
            <GoogleAuthButton
              text="Sign up with Google"
              onSuccess={() => navigate('/')}
              onError={(errMsg) => setError(errMsg)}
            />
          </div>

          <Divider sx={{ my: 2.5 }}>
            <Typography variant="caption" sx={{ color: '#77708F', fontWeight: 600, px: 1, letterSpacing: '0.5px' }}>
              OR SIGN UP WITH EMAIL
            </Typography>
          </Divider>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12">
                <TextField
                  fullWidth
                  size="small"
                  label="Full Name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 col-sm-6">
                <TextField
                  fullWidth
                  size="small"
                  label="Email Address"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 col-sm-6">
                <TextField
                  fullWidth
                  size="small"
                  label="Phone Number"
                  name="phone"
                  placeholder="+91 98000 00000"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 col-sm-6">
                <TextField
                  fullWidth
                  size="small"
                  label="Password"
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 col-sm-6">
                <TextField
                  fullWidth
                  size="small"
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <TextField
                  fullWidth
                  size="small"
                  label="Street Address / Residence"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
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
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                backgroundColor: '#292536',
                color: '#ffffff',
                py: 1.2,
                fontWeight: 600,
                mt: 3,
                '&:hover': { backgroundColor: '#000000' }
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Register & Create Account'}
            </Button>
          </form>

          <Divider sx={{ my: 3 }} />

          <div className="text-center" style={{ fontSize: '0.85rem' }}>
            <span className="text-muted">Already have an account? </span>
            <Link to="/login" style={{ color: '#77708F', fontWeight: 600 }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
