const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/search/suggestions', productController.getSearchSuggestions);
router.get('/', productController.getProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/slug/:slug', productController.getProductBySlug);
router.get('/:id', productController.getProductById);
router.get('/:id/images', productController.getProductImages);
router.get('/:id/related', productController.getRelatedProducts);

module.exports = router;

