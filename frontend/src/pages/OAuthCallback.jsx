import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CircularProgress, Typography, Box, Alert, Button } from '@mui/material';

export default function OAuthCallback() {
  const { loginWithGoogleCode } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function handleCallback() {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');
      const errorParam = searchParams.get('error');

      if (errorParam) {
        setError(`Google authentication was cancelled: ${errorParam}`);
        setLoading(false);
        return;
      }

      if (!code) {
        setError('Missing Google authorization code in callback.');
        setLoading(false);
        return;
      }

      try {
        const redirectUri = `${window.location.origin}/oauth/callback`;
        await loginWithGoogleCode(code, redirectUri);
        navigate('/', { replace: true });
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Google sign-in verification failed.');
        setLoading(false);
      }
    }

    handleCallback();
  }, [location.search, loginWithGoogleCode, navigate]);

  return (
    <Box
      sx={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F7F5FA',
        px: 2
      }}
    >
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          p: 4,
          borderRadius: '16px',
          border: '1px solid #E2DFEB',
          boxShadow: '0 8px 30px rgba(41, 37, 54, 0.08)',
          maxWidth: '440px',
          width: '100%',
          textAlign: 'center'
        }}
      >
        {loading ? (
          <>
            <CircularProgress size={44} sx={{ color: '#292536', mb: 2.5 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1F1B2B', mb: 1 }}>
              Authenticating with Google...
            </Typography>
            <Typography variant="body2" sx={{ color: '#77708F' }}>
              Securing your session and signing you into Élixir Parfums.
            </Typography>
          </>
        ) : error ? (
          <>
            <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
              {error}
            </Alert>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{
                backgroundColor: '#292536',
                color: '#FFFFFF',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': { backgroundColor: '#000000' }
              }}
            >
              Back to Sign In
            </Button>
          </>
        ) : null}
      </Box>
    </Box>
  );
}

