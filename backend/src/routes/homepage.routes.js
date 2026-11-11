const express = require('express');
const router = express.Router();
const homePageController = require('../controllers/homePageController');

// Public route to fetch complete dynamic home page configuration
router.get('/', homePageController.getPublicHomePage);

module.exports = router;

