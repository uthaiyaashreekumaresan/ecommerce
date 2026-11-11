import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CircularProgress, Box } from '@mui/material';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { loading, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: '#77708F' }} />
      </Box>
    );
  }

  // Admin Route Protection: strictly requires authenticated admin session
  if (adminOnly) {
    if (!isAdmin) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    return children;
  }

  // Customer Route Protection: strictly requires customer authentication
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
