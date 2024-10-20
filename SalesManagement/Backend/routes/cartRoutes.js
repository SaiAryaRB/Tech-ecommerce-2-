const express = require('express');
const router = express.Router();
const { cart } = require('../controllers/cartController'); // Adjust the path

// Route to add a product to the cart
router.post('/cart', cart);

module.exports = router;
