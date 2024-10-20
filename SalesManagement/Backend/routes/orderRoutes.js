const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController'); // Import the controller

// Route for confirming order
router.post('/confirm', orderController.order);
module.exports = router;
