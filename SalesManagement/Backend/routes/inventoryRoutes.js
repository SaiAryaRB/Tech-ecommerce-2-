const express = require('express');
const { getInventory, addNewProduct, deleteProduct, updateProduct} = require('../controllers/inventoryController');

const router = express.Router();

// Define routes for inventory operations
router.get('/', getInventory); // Get all inventory items
router.post('/', addNewProduct); // Add a new product to inventory
router.put('/:id', updateProduct); // Update an existing inventory item by ID
router.post('/delete', deleteProduct); // Delete a product by ID

module.exports = router;
