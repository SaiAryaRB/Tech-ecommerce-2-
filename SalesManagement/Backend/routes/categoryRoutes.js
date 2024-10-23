const express = require('express');
const router = express.Router();
const db = require('../database'); // Adjust the path based on your project structure

// GET all categories
router.get('/', (req, res) => {
    const query = `
        SELECT c.Category_ID, c.Category_Name, c.Super_Category
        FROM Category c
        LEFT JOIN PRODUCT_CATEGORY pc ON c.Category_ID = pc.Category_ID;
    `;

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching categories:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});

module.exports = router;
