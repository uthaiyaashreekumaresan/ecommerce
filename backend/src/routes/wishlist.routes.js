const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const { authenticateToken } = require('../middleware/auth');

// All wishlist operations require authenticated user
router.use(authenticateToken);

router.get('/', wishlistController.getWishlist);
router.post('/toggle', wishlistController.toggleWishlist);
router.post('/add', wishlistController.addToWishlist);
router.delete('/:productId', wishlistController.removeFromWishlist);
router.post('/sync', wishlistController.syncWishlist);

module.exports = router;

