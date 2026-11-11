import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleAuthButton from '../components/GoogleAuthButton';
import {
  TextField,
  Button,
  Alert,
  CircularProgress,
  Typography,
  Box,
  Divider,
  Chip
} from '@mui/material';
import { DiamondOutlined } from '@mui/icons-material';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      const safeFrom = (from && !from.startsWith('/admin')) ? from : '/';
      navigate(safeFrom, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5" style={{ backgroundColor: '#F7F5FA', minHeight: '80vh' }}>
      <div className="container d-flex justify-content-center">
        <div className="bg-white p-4 p-md-5 rounded border shadow-sm" style={{ width: '100%', maxWidth: '460px', borderColor: '#E2DFEB' }}>
          {/* Logo Header */}
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
              Welcome Back
            </h3>
            <Typography variant="body2" color="text.secondary">
              Sign in to your Élixir Parfums account
            </Typography>
          </div>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          {/* Continue with Google */}
          <div className="mb-3">
            <GoogleAuthButton
              text="Continue with Google"
              onSuccess={() => {
                navigate('/', { replace: true });
              }}
              onError={(errMsg) => setError(errMsg)}
            />
          </div>

          <Divider sx={{ my: 2.5 }}>
            <Typography variant="caption" sx={{ color: '#77708F', fontWeight: 600, px: 1, letterSpacing: '0.5px' }}>
              OR CONTINUE WITH EMAIL
            </Typography>
          </Divider>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                size="small"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <TextField
                fullWidth
                label="Password"
                type="password"
                size="small"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
                fontWeight: 700,
                mt: 1,
                '&:hover': { backgroundColor: '#000000' }
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Sign In'}
            </Button>
          </form>

          <Divider sx={{ my: 3 }} />

          <div className="text-center" style={{ fontSize: '0.85rem' }}>
            <span className="text-muted">Don't have an account? </span>
            <Link to="/register" style={{ color: '#77708F', fontWeight: 600 }}>
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
