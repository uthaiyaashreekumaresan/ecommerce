const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const homePageController = require('../controllers/homePageController');
const { authenticateToken } = require('../middleware/auth');
const requireAdmin = require('../middleware/adminAuth');
const upload = require('../middleware/upload');

// Protect all admin routes with JWT and admin role verification
router.use(authenticateToken, requireAdmin);

// Dashboard
router.get('/dashboard/stats', adminController.getStats);

// Home Page Management
router.get('/homepage', homePageController.getAdminHomePage);
router.post('/homepage/sliders', homePageController.createSlider);
router.put('/homepage/sliders/reorder', homePageController.reorderSliders);
router.put('/homepage/sliders/:id', homePageController.updateSlider);
router.delete('/homepage/sliders/:id', homePageController.deleteSlider);
router.patch('/homepage/sliders/:id/toggle', homePageController.toggleSlider);

router.put('/homepage/sections', homePageController.updateSections);
router.patch('/homepage/sections/:key/toggle', homePageController.toggleSection);

router.post('/homepage/offers', homePageController.createOffer);
router.put('/homepage/offers/:id', homePageController.updateOffer);
router.delete('/homepage/offers/:id', homePageController.deleteOffer);
router.patch('/homepage/offers/:id/toggle', homePageController.toggleOffer);

router.put('/homepage/collections', homePageController.updateCollections);

// Products
router.get('/products', adminController.getAllProducts);
router.post('/products', adminController.createProduct);
router.put('/products/:id', adminController.updateProduct);
router.patch('/products/:id/image', upload.single('image'), adminController.updateProductImage);
router.put('/products/:id/image', upload.single('image'), adminController.updateProductImage);
router.delete('/products/:id', adminController.deleteProduct);

// Product 3-Image Management APIs (Upload, Replace, Fetch)
router.get('/products/:id/images', adminController.getProduct3Images);
router.put('/products/:id/images', upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 }
]), adminController.updateProduct3Images);
router.patch('/products/:id/images', upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 }
]), adminController.updateProduct3Images);

// Individual Image Upload / Replace APIs for Image 1, Image 2, and Image 3
router.put('/products/:id/images/:index', upload.single('image'), adminController.updateProductImageIndex);
router.patch('/products/:id/images/:index', upload.single('image'), adminController.updateProductImageIndex);
router.post('/products/:id/images/:index', upload.single('image'), adminController.updateProductImageIndex);

// Specific Named Endpoints for Image 1, Image 2, Image 3
router.put('/products/:id/image1', upload.single('image'), (req, res, next) => { req.params.index = '1'; return adminController.updateProductImageIndex(req, res, next); });
router.put('/products/:id/image2', upload.single('image'), (req, res, next) => { req.params.index = '2'; return adminController.updateProductImageIndex(req, res, next); });
router.put('/products/:id/image3', upload.single('image'), (req, res, next) => { req.params.index = '3'; return adminController.updateProductImageIndex(req, res, next); });
router.patch('/products/:id/image1', upload.single('image'), (req, res, next) => { req.params.index = '1'; return adminController.updateProductImageIndex(req, res, next); });
router.patch('/products/:id/image2', upload.single('image'), (req, res, next) => { req.params.index = '2'; return adminController.updateProductImageIndex(req, res, next); });
router.patch('/products/:id/image3', upload.single('image'), (req, res, next) => { req.params.index = '3'; return adminController.updateProductImageIndex(req, res, next); });

// Categories
router.post('/categories', adminController.createCategory);
router.put('/categories/:id', adminController.updateCategory);
router.delete('/categories/:id', adminController.deleteCategory);

// Brands
router.post('/brands', adminController.createBrand);
router.put('/brands/:id', adminController.updateBrand);
router.delete('/brands/:id', adminController.deleteBrand);

// Orders
router.get('/orders', adminController.getAllOrders);
router.put('/orders/:id/status', adminController.updateOrderStatus);

// Customers
router.get('/customers', adminController.getAllCustomers);

// Inventory
router.get('/inventory', adminController.getInventory);

// File Upload
router.post('/upload', upload.single('image'), adminController.uploadImage);

module.exports = router;

