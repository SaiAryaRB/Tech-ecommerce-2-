const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Define the route to get customer details
router.post('/customerdetails', customerController.details);

module.exports = router;