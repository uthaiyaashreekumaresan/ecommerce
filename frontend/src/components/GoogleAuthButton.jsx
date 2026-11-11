import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { Button, CircularProgress } from '@mui/material';

// Official multi-color Google 'G' icon
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" style={{ display: 'block', flexShrink: 0 }}>
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.02h3.87c2.26-2.09 3.675-5.17 3.675-9.12z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.02c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.26v3.12C3.25 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.61H1.26C.46 8.23 0 10.06 0 12s.46 3.77 1.26 5.39l4.01-3.12z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.26 6.61l4.01 3.12c.95-2.85 3.6-4.98 6.73-4.98z"
      />
    </svg>
  );
}

const FALLBACK_CLIENT_ID = '572353730176-gt9ooehp0vrgb19n9u8l5rka7v4lvp5s.apps.googleusercontent.com';

export default function GoogleAuthButton({
  text = 'Continue with Google',
  onSuccess,
  onError,
  disabled = false
}) {
  const { loginWithGoogle, loginWithGoogleCode } = useAuth();
  const [loading, setLoading] = useState(false);
  const [clientId, setClientId] = useState(() => {
    const envId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    return (envId && !envId.includes('your_google_client_id_here')) ? envId : FALLBACK_CLIENT_ID;
  });

  const codeClientRef = useRef(null);

  // Fetch client ID from backend if needed and load Google GSI script
  useEffect(() => {
    let isMounted = true;

    async function resolveClientId() {
      try {
        const id = await authService.getGoogleClientId();
        if (id && isMounted) {
          setClientId(id);
        }
      } catch (e) {
        // Fallback already set
      }
    }

    if (!clientId || clientId.includes('your_google_client_id_here')) {
      resolveClientId();
    }

    // Load Google Identity Services (GSI) script
    const scriptId = 'google-identity-services-script';
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    return () => {
      isMounted = false;
    };
  }, [clientId]);

  // Initialize Code Client when GSI is ready and clientId is set
  useEffect(() => {
    if (!clientId) return;

    const interval = setInterval(() => {
      if (window.google?.accounts?.oauth2) {
        clearInterval(interval);
        try {
          codeClientRef.current = window.google.accounts.oauth2.initCodeClient({
            client_id: clientId,
            scope: 'openid email profile',
            ux_mode: 'popup',
            callback: async (response) => {
              if (response.error) {
                if (response.error !== 'popup_closed_by_user') {
                  const errMsg = response.error_description || response.error || 'Google authentication was cancelled.';
                  if (onError) onError(errMsg);
                }
                setLoading(false);
                return;
              }

              if (response.code) {
                setLoading(true);
                try {
                  const customer = await loginWithGoogleCode(response.code, 'postmessage');
                  if (onSuccess) onSuccess(customer);
                } catch (err) {
                  const errMsg = err.response?.data?.message || err.message || 'Google authentication failed.';
                  if (onError) onError(errMsg);
                } finally {
                  setLoading(false);
                }
              }
            }
          });
        } catch (e) {
          console.warn('GSI initCodeClient error:', e);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [clientId, loginWithGoogleCode, onSuccess, onError]);

  // Click Handler: Directly triggers official Google Sign-In authentication flow
  const handleClick = () => {
    if (disabled || loading) return;
    setLoading(true);

    // If Google Code Client popup is initialized, use it
    if (codeClientRef.current) {
      try {
        codeClientRef.current.requestCode();
        return;
      } catch (err) {
        console.warn('codeClient requestCode error, using redirect fallback:', err);
      }
    }

    // Direct Google OAuth 2.0 full-page redirect flow as resilient standard
    const effectiveClientId = clientId || FALLBACK_CLIENT_ID;
    const redirectUri = `${window.location.origin}/oauth/callback`;
    const scope = 'openid email profile';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
      effectiveClientId
    )}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=${encodeURIComponent(
      scope
    )}&prompt=select_account&access_type=offline`;

    window.location.href = authUrl;
  };

  return (
    <Button
      type="button"
      variant="outlined"
      fullWidth
      size="large"
      disabled={disabled || loading}
      onClick={handleClick}
      sx={{
        backgroundColor: '#FFFFFF',
        borderColor: '#D8D2E4',
        color: '#292536',
        py: 1.2,
        px: 2,
        fontWeight: 600,
        fontSize: '0.92rem',
        letterSpacing: '0.2px',
        textTransform: 'none',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(41, 37, 54, 0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        '&:hover': {
          backgroundColor: '#FAF9FC',
          borderColor: '#C5A059',
          boxShadow: '0 6px 18px rgba(41, 37, 54, 0.08)',
          transform: 'translateY(-1.5px)'
        },
        '&:active': {
          transform: 'translateY(0)'
        }
      }}
    >
      {loading ? (
        <CircularProgress size={22} sx={{ color: '#77708F' }} />
      ) : (
        <>
          <GoogleIcon />
          <span>{text}</span>
        </>
      )}
    </Button>
  );
}
