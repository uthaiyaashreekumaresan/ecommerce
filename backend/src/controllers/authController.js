const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Store = require('../db/store');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_florencia_luxury_parfums_2026';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, phone, address, city, state, pincode } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
    }

    const existing = await Store.findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ success: false, message: 'An account with this email address already exists.' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const user = await Store.createUser({
      name,
      email,
      password_hash,
      role: 'customer',
      phone,
      address,
      city,
      state,
      pincode
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const { password_hash: _hash, ...safeUser } = user;

    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      token,
      user: safeUser
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const user = await Store.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Strict Role Separation: Customer login endpoint rejects admin accounts
    if (user.role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'This portal is restricted to customer accounts only. Administrators must sign in through the Admin Portal.'
      });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: 'customer', name: user.name },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const { password_hash, ...safeUser } = user;

    res.json({
      success: true,
      message: 'Logged in successfully.',
      token,
      user: safeUser
    });
  } catch (err) {
    next(err);
  }
};

exports.getGoogleClientId = (req, res) => {
  res.json({
    success: true,
    clientId: process.env.GOOGLE_CLIENT_ID || '572353730176-gt9ooehp0vrgb19n9u8l5rka7v4lvp5s.apps.googleusercontent.com'
  });
};

exports.googleLogin = async (req, res, next) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: 'Google credential token is required.'
      });
    }

    let googleProfile = null;

    // 1. Verify Google ID Token (JWT) via Google's tokeninfo API
    try {
      const verifyUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`;
      const tokenRes = await fetch(verifyUrl);
      if (tokenRes.ok) {
        const data = await tokenRes.json();
        if (data && data.email) {
          googleProfile = {
            email: data.email,
            name: data.name || data.given_name || 'Google Customer',
            sub: data.sub,
            picture: data.picture || null
          };
        }
      }
    } catch (fetchErr) {
      console.warn('Google TokenInfo API error (falling back to JWT decoding):', fetchErr.message);
    }

    // 2. Fallback: Parse ID token payload directly
    if (!googleProfile) {
      try {
        const parts = credential.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
          if (payload && payload.email) {
            googleProfile = {
              email: payload.email,
              name: payload.name || payload.given_name || 'Google Customer',
              sub: payload.sub,
              picture: payload.picture || null
            };
          }
        }
      } catch (jwtErr) {
        console.warn('Failed to parse Google credential token:', jwtErr.message);
      }
    }

    if (!googleProfile || !googleProfile.email) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired Google authentication credentials.'
      });
    }

    const { email, name, sub: google_id, picture: avatar } = googleProfile;

    // Strict Role Separation: Reject admin users from signing into customer portal
    let user = await Store.findUserByGoogleId(google_id);
    if (!user) {
      user = await Store.findUserByEmail(email);
    }

    if (user && user.role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'This portal is restricted to customer accounts only. Administrators must sign in through the Admin Portal.'
      });
    }

    if (user) {
      // Existing customer: link google_id or update avatar if missing
      const updateFields = {};
      if (!user.google_id) updateFields.google_id = google_id;
      if (!user.avatar && avatar) updateFields.avatar = avatar;
      if (Object.keys(updateFields).length > 0) {
        user = await Store.updateUser(user.id, updateFields);
      }
    } else {
      // New customer: create account with role 'customer'
      const crypto = require('crypto');
      const randomSecret = crypto.randomBytes(24).toString('hex');
      const password_hash = await bcrypt.hash(randomSecret, 10);
      user = await Store.createUser({
        name,
        email,
        password_hash,
        role: 'customer',
        google_id,
        avatar,
        auth_provider: 'google'
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: 'customer', name: user.name },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const { password_hash: _hash, ...safeUser } = user;

    res.json({
      success: true,
      message: 'Logged in with Google successfully.',
      token,
      user: safeUser
    });
  } catch (err) {
    next(err);
  }
};

exports.googleCodeLogin = async (req, res, next) => {
  try {
    const { code, redirectUri } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Google authorization code is required.'
      });
    }

    const clientId = process.env.GOOGLE_CLIENT_ID || '572353730176-gt9ooehp0vrgb19n9u8l5rka7v4lvp5s.apps.googleusercontent.com';
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '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';

    // Exchange code for tokens at Google's token endpoint
    const tokenEndpoint = 'https://oauth2.googleapis.com/token';
    const bodyParams = new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri || 'postmessage',
      grant_type: 'authorization_code'
    });

    let tokenData = null;
    try {
      const tokenRes = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: bodyParams.toString()
      });
      tokenData = await tokenRes.json();
    } catch (err) {
      console.warn('Error fetching Google token from code:', err.message);
    }

    if (!tokenData || tokenData.error) {
      const errDescription = tokenData?.error_description || tokenData?.error || 'Failed to exchange authorization code with Google.';
      return res.status(400).json({ success: false, message: errDescription });
    }

    let googleProfile = null;

    // Fetch user profile using access_token
    if (tokenData.access_token) {
      try {
        const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenData.access_token}` }
        });
        if (userRes.ok) {
          const profile = await userRes.json();
          if (profile && profile.email) {
            googleProfile = {
              email: profile.email,
              name: profile.name || profile.given_name || 'Google Customer',
              sub: profile.sub,
              picture: profile.picture || null
            };
          }
        }
      } catch (userErr) {
        console.warn('Error fetching Google userinfo:', userErr.message);
      }
    }

    // Fallback: parse id_token
    if (!googleProfile && tokenData.id_token) {
      try {
        const parts = tokenData.id_token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
          if (payload && payload.email) {
            googleProfile = {
              email: payload.email,
              name: payload.name || payload.given_name || 'Google Customer',
              sub: payload.sub,
              picture: payload.picture || null
            };
          }
        }
      } catch (jwtErr) {
        console.warn('Error decoding Google id_token:', jwtErr.message);
      }
    }

    if (!googleProfile || !googleProfile.email) {
      return res.status(400).json({ success: false, message: 'Could not retrieve verified Google profile.' });
    }

    const { email, name, sub: google_id, picture: avatar } = googleProfile;

    // Strict Role Separation: Reject admin users from customer Google OAuth
    let user = await Store.findUserByGoogleId(google_id);
    if (!user) {
      user = await Store.findUserByEmail(email);
    }

    if (user && user.role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'This portal is restricted to customer accounts only. Administrators must sign in through the Admin Portal.'
      });
    }

    if (user) {
      // Existing customer: link google_id or update avatar if missing
      const updateFields = {};
      if (!user.google_id) updateFields.google_id = google_id;
      if (!user.avatar && avatar) updateFields.avatar = avatar;
      if (Object.keys(updateFields).length > 0) {
        user = await Store.updateUser(user.id, updateFields);
      }
    } else {
      // New customer: create account with role 'customer'
      const crypto = require('crypto');
      const randomSecret = crypto.randomBytes(24).toString('hex');
      const password_hash = await bcrypt.hash(randomSecret, 10);
      user = await Store.createUser({
        name,
        email,
        password_hash,
        role: 'customer',
        google_id,
        avatar,
        auth_provider: 'google'
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: 'customer', name: user.name },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const { password_hash: _hash, ...safeUser } = user;

    res.json({
      success: true,
      message: 'Logged in with Google successfully.',
      token,
      user: safeUser
    });
  } catch (err) {
    next(err);
  }
};

exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Administrative email and password are required.' });
    }

    const user = await Store.findUserByEmail(email);
    if (!user || user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Invalid administrative credentials or insufficient privileges.' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid administrative credentials or insufficient privileges.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: 'admin', name: user.name },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    const { password_hash, ...safeUser } = user;

    res.json({
      success: true,
      message: 'Administrative session authenticated.',
      token,
      user: safeUser
    });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await Store.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    // Never expose admin details through customer auth endpoint
    if (user.role === 'admin') {
      return res.status(403).json({ success: false, message: 'Access restricted: Please authenticate through the Admin Portal.' });
    }
    const { password_hash: _hash, ...safeUser } = user;
    res.json({ success: true, user: safeUser });
  } catch (err) {
    next(err);
  }
};

exports.getAdminMe = async (req, res, next) => {
  try {
    const user = await Store.findUserById(req.user.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied: Admin privileges required.' });
    }
    const { password_hash: _hash, ...safeUser } = user;
    res.json({ success: true, user: safeUser });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, phone, address, city, state, pincode } = req.body;
    const updated = await Store.updateUser(req.user.id, {
      name,
      phone,
      address,
      city,
      state,
      pincode
    });
    const { password_hash: _hash, ...safeUser } = updated;
    res.json({ success: true, message: 'Profile updated successfully.', user: safeUser });
  } catch (err) {
    next(err);
  }
};

