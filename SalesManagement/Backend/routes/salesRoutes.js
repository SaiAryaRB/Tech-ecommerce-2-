const express = require('express');
const { xyz } = require('../controllers/salesController');
const router = express.Router();
console.log('Sales routes are being registered');
// Route to fetch sales data for October 2023
router.get('/sales', xyz);

module.exports = router;

