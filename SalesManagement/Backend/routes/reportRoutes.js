// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Define the route for report generation
router.get('/reports/:type', reportController.generateReport);

module.exports = router;
