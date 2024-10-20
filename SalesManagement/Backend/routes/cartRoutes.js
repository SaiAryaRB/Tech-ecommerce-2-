const express = require('express');
const router = express.Router();
const { cart } = require('../controllers/cartController'); // Adjust the path
const {cartinfo} =require('../controllers/cartViewController') ;
// Route to add a product to the cart
router.post('/cart', cart);
router.post('/viewcart',cartinfo)

module.exports = router;
