import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Customer State (Strictly for Customer Storefront)
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('perfume_token'));

  // Admin State (Strictly for Protected Admin Backoffice)
  const [adminUser, setAdminUser] = useState(null);
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('perfume_admin_token'));

  const [loading, setLoading] = useState(true);

  // Load Customer Session
  useEffect(() => {
    async function loadCustomer() {
      if (token) {
        try {
          const res = await authService.getMe();
          if (res.success && res.user && res.user.role !== 'admin') {
            setUser(res.user);
          } else if (res.user && res.user.role === 'admin') {
            // Isolate admin from customer session: migrate to admin token
            localStorage.setItem('perfume_admin_token', token);
            setAdminToken(token);
            setAdminUser(res.user);
            localStorage.removeItem('perfume_token');
            setToken(null);
            setUser(null);
          } else {
            logout();
          }
        } catch (err) {
          logout();
        }
      }
    }
    loadCustomer();
  }, [token]);

  // Load Admin Session
  useEffect(() => {
    async function loadAdmin() {
      if (adminToken) {
        try {
          const res = await authService.getAdminMe(adminToken);
          if (res.success && res.user && res.user.role === 'admin') {
            setAdminUser(res.user);
          } else {
            adminLogout();
          }
        } catch (err) {
          adminLogout();
        }
      }
      setLoading(false);
    }
    loadAdmin();
  }, [adminToken]);

  // Customer Login (Customer Storefront Only)
  const login = async (email, password) => {
    const res = await authService.login(email, password);
    if (res.success && res.token) {
      if (res.user?.role === 'admin') {
        throw new Error('Access denied: Customer portal only.');
      }
      localStorage.setItem('perfume_token', res.token);
      setToken(res.token);
      setUser(res.user);
      return res.user;
    }
    throw new Error(res.message || 'Login failed');
  };

  // Customer Registration
  const register = async (userData) => {
    const res = await authService.register(userData);
    if (res.success && res.token) {
      localStorage.setItem('perfume_token', res.token);
      setToken(res.token);
      setUser(res.user);
      return res.user;
    }
    throw new Error(res.message || 'Registration failed');
  };

  // Customer Google OAuth Login (via ID token)
  const loginWithGoogle = async (credential) => {
    const res = await authService.googleLogin(credential);
    if (res.success && res.token) {
      if (res.user?.role === 'admin') {
        throw new Error('Access denied: Customer portal only.');
      }
      localStorage.setItem('perfume_token', res.token);
      setToken(res.token);
      setUser(res.user);
      return res.user;
    }
    throw new Error(res.message || 'Google authentication failed');
  };

  // Customer Google OAuth Login (via Authorization Code)
  const loginWithGoogleCode = async (code, redirectUri) => {
    const res = await authService.googleCodeLogin(code, redirectUri);
    if (res.success && res.token) {
      if (res.user?.role === 'admin') {
        throw new Error('Access denied: Customer portal only.');
      }
      localStorage.setItem('perfume_token', res.token);
      setToken(res.token);
      setUser(res.user);
      return res.user;
    }
    throw new Error(res.message || 'Google authorization failed');
  };

  // Customer Logout
  const logout = () => {
    localStorage.removeItem('perfume_token');
    setToken(null);
    setUser(null);
  };

  // Admin Login (Exclusively for /admin/login)
  const adminLogin = async (email, password) => {
    const res = await authService.adminLogin(email, password);
    if (res.success && res.token && res.user?.role === 'admin') {
      localStorage.setItem('perfume_admin_token', res.token);
      setAdminToken(res.token);
      setAdminUser(res.user);
      return res.user;
    }
    throw new Error(res.message || 'Administrative authentication failed');
  };

  // Admin Logout (Exclusively for Admin Backoffice)
  const adminLogout = () => {
    localStorage.removeItem('perfume_admin_token');
    setAdminToken(null);
    setAdminUser(null);
  };

  // Customer Profile Update
  const updateProfile = async (profileData) => {
    const res = await authService.updateProfile(profileData);
    if (res.success && res.user) {
      setUser(prev => ({ ...prev, ...res.user }));
      return res.user;
    }
    throw new Error(res.message || 'Profile update failed');
  };

  const isAdmin = Boolean(adminUser && adminUser.role === 'admin');

  return (
    <AuthContext.Provider
      value={{
        // Customer Context
        user,
        token,
        loading,
        isAuthenticated: Boolean(user && user.role !== 'admin'),
        login,
        register,
        loginWithGoogle,
        loginWithGoogleCode,
        logout,
        updateProfile,

        // Admin Context (Separate & Role-Protected)
        adminUser,
        adminToken,
        isAdmin,
        adminLogin,
        adminLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
