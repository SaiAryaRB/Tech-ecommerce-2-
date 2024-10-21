// routes/inventoryRoutes.js
const express = require('express');
const { getInventory, addInventoryItem, updateInventoryItem } = require('../controllers/inventoryController');

const router = express.Router();

// Define routes for inventory operations
router.get('/', getInventory); // Get all inventory items
router.post('/', addInventoryItem); // Add a new inventory item
router.put('/:id', updateInventoryItem); // Update an existing inventory item by ID

module.exports = router;
