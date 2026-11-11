const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const requireAdmin = require('../middleware/adminAuth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/google/client-id', authController.getGoogleClientId);
router.post('/google', authController.googleLogin);
router.post('/google/code', authController.googleCodeLogin);
router.post('/admin/login', authController.adminLogin);
router.get('/me', authenticateToken, authController.getMe);
router.get('/admin/me', authenticateToken, requireAdmin, authController.getAdminMe);
router.put('/profile', authenticateToken, authController.updateProfile);

module.exports = router;

