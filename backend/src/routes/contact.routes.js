const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { authenticateToken } = require('../middleware/auth');
const requireAdmin = require('../middleware/adminAuth');

router.post('/', contactController.submitContact);
router.get('/', authenticateToken, requireAdmin, contactController.getMessages);

module.exports = router;

