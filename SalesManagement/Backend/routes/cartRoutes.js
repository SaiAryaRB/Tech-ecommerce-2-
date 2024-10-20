const express = require('express');
const router = express.Router();
const { cart , updatecart , deletecart} = require('../controllers/cartController'); // Adjust the path
const {cartinfo} =require('../controllers/cartViewController') ;
// Route to add a product to the cart
router.post('/cart', cart);
router.post('/viewcart',cartinfo)
router.post('/deletecart',deletecart)
router.post('/updatecart',updatecart)
module.exports = router;
