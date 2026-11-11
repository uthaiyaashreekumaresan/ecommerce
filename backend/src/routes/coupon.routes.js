const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const { authenticateToken } = require('../middleware/auth');
const requireAdmin = require('../middleware/adminAuth');

// Public routes: promotional offers & dynamic coupon reveal
router.get('/promotional', couponController.getActiveCoupons);
router.get('/offer/:id', couponController.getOfferCoupon);
router.get('/validate/:code', couponController.validateCoupon);

// Admin listing
router.get('/', authenticateToken, requireAdmin, couponController.getAllCoupons);

module.exports = router;

