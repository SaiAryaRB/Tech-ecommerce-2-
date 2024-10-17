const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to get all Super Categories
router.get('/supercategories', productController.supercategory);

// Route to get Sub Categories by Super Category
router.post('/subcategories', productController.subcategory);

// Route to get Products by Sub Category
router.post('/items', productController.products);


// Route for fetching reviews based on ProductID
router.post('/reviews', productController.reviews );

module.exports = router;

module.exports = router;

