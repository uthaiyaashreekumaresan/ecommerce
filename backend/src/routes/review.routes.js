const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { optionalToken } = require('../middleware/auth');

router.get('/product/:productId', reviewController.getProductReviews);
router.post('/', optionalToken, reviewController.addReview);

module.exports = router;

