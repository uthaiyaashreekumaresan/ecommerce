import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import {
  DiamondOutlined,
  LockOutlined,
  EmailOutlined,
  Visibility,
  VisibilityOff,
  Security,
  ArrowBack
} from '@mui/icons-material';

export default function AdminLogin() {
  const { adminLogin, adminLogout, adminUser, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If already authenticated as admin, redirect to admin dashboard
  React.useEffect(() => {
    if (adminUser && isAdmin) {
      navigate('/admin', { replace: true });
    }
  }, [adminUser, isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter both administrative email and password.');
      return;
    }

    setLoading(true);
    try {
      await adminLogin(email.trim(), password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Authentication failed. Please verify your administrative credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#15131C',
        backgroundImage: 'radial-gradient(ellipse at 50% 20%, rgba(119, 112, 143, 0.25) 0%, rgba(21, 19, 28, 0.95) 75%)',
        p: 2
      }}
    >
      <Card
        elevation={12}
        sx={{
          maxWidth: 440,
          width: '100%',
          backgroundColor: '#201D2A',
          color: '#ffffff',
          borderRadius: 3,
          border: '1px solid rgba(184, 175, 203, 0.2)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          {/* Header & Emblem */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: 'rgba(184, 175, 203, 0.12)',
                border: '1px solid rgba(184, 175, 203, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}
            >
              <DiamondOutlined sx={{ color: '#D4AF37', fontSize: 32 }} />
            </Box>
            <Typography variant="h5" sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, letterSpacing: '1px', color: '#FFFFFF' }}>
              ÉLIXIR PARFUMS
            </Typography>
            <Typography variant="caption" sx={{ color: '#B8AFCB', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.72rem', display: 'block', mt: 0.5 }}>
              Backoffice Management Portal
            </Typography>

            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.8,
                backgroundColor: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '6px',
                px: 1.5,
                py: 0.5,
                mt: 2
              }}
            >
              <Security sx={{ fontSize: 14, color: '#D4AF37' }} />
              <Typography variant="caption" sx={{ color: '#E8D595', fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.5px' }}>
                RESTRICTED AREA • ADMIN ONLY
              </Typography>
            </Box>
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                backgroundColor: 'rgba(211, 47, 47, 0.15)',
                color: '#ffcdd2',
                border: '1px solid rgba(211, 47, 47, 0.4)',
                '& .MuiAlert-icon': { color: '#ff6b6b' }
              }}
            >
              {error}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2.5 }}>
              <Typography variant="caption" sx={{ color: '#B8AFCB', fontWeight: 600, mb: 0.8, display: 'block' }}>
                ADMINISTRATIVE EMAIL
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="email"
                placeholder="admin@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined sx={{ color: '#77708F', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: '#15131C',
                    color: '#fff',
                    borderRadius: 2,
                    fontSize: '0.9rem',
                    '& fieldset': { borderColor: 'rgba(184, 175, 203, 0.25)' },
                    '&:hover fieldset': { borderColor: '#B8AFCB' },
                    '&.Mui-focused fieldset': { borderColor: '#D4AF37' }
                  }
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" sx={{ color: '#B8AFCB', fontWeight: 600, mb: 0.8, display: 'block' }}>
                ADMINISTRATIVE PASSWORD
              </Typography>
              <TextField
                fullWidth
                size="small"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ color: '#77708F', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: '#77708F' }}
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: '#15131C',
                    color: '#fff',
                    borderRadius: 2,
                    fontSize: '0.9rem',
                    '& fieldset': { borderColor: 'rgba(184, 175, 203, 0.25)' },
                    '&:hover fieldset': { borderColor: '#B8AFCB' },
                    '&.Mui-focused fieldset': { borderColor: '#D4AF37' }
                  }
                }}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                backgroundColor: '#D4AF37',
                color: '#15131C',
                py: 1.2,
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
                borderRadius: 2,
                '&:hover': { backgroundColor: '#F0C955' },
                '&:disabled': { backgroundColor: 'rgba(212, 175, 55, 0.3)', color: '#888' }
              }}
            >
              {loading ? <CircularProgress size={22} sx={{ color: '#15131C' }} /> : 'Authenticate & Enter Portal'}
            </Button>
          </form>

          {/* Return to Storefront link */}
          <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(184, 175, 203, 0.15)', textAlign: 'center' }}>
            <Button
              component={Link}
              to="/"
              size="small"
              startIcon={<ArrowBack sx={{ fontSize: 16 }} />}
              sx={{
                color: '#B8AFCB',
                textTransform: 'none',
                fontSize: '0.8rem',
                '&:hover': { color: '#ffffff', backgroundColor: 'transparent' }
              }}
            >
              Return to Customer Storefront
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

