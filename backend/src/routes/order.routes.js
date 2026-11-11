const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateToken, optionalToken } = require('../middleware/auth');

// Allow guest checkout or logged-in checkout
router.post('/checkout', optionalToken, orderController.checkout);

// Requires auth for order history
router.get('/my-orders', authenticateToken, orderController.getMyOrders);
router.get('/:id', optionalToken, orderController.getOrderById);

module.exports = router;

