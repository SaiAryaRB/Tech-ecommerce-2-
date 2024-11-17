// controllers/productController.js
const db = require('../database'); // Adjust the path to your database connection file

// Get all Super Categories
exports.supercategory = (req, res) => {
    const query = 'SELECT DISTINCT Super_Category FROM CATEGORY';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
};

// Get Sub Categories by Super Category (changed to POST)
exports.subcategory = (req, res) => {
    const { superCategory } = req.body; // Access superCategory from the request body
    const query = 'SELECT * FROM CATEGORY WHERE Super_Category = ?';
    
    db.query(query, [superCategory], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
};

exports.products = (req, res) => {
    const { categoryName } = req.body; // Get category name from request body

    // Query to get the Category_ID based on Category_Name
    const categoryQuery = 'SELECT Category_ID FROM CATEGORY WHERE Category_Name = ?';

    db.query(categoryQuery, [categoryName], (err, categoryResults) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (categoryResults.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const categoryId = categoryResults[0].Category_ID; // Get the Category_ID

        // Query to get products belonging to the Category_ID
        const productQuery = `
            SELECT p.* FROM PRODUCTS_ACTIVE p
            JOIN PRODUCT_CATEGORY pc ON p.Product_ID = pc.Product_ID
            WHERE pc.Category_ID = ?`;
        db.query(productQuery, [categoryId], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(results);
            console.log(results) ; // Respond with the products
        });
    });
}; 

// In your controllers/productController.js

exports.reviews = (req, res) => {
    const { productId } = req.body; // Get ProductID from request body

    // Query to get reviews for the ProductID
    const reviewQuery = 'SELECT ReviewText, Rating FROM REVIEW WHERE ProductID = ?';

    db.query(reviewQuery, [productId], (err, reviewResults) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (reviewResults.length === 0) {
            return res.json({ reviews: [], averageRating: null });
        }

        // Calculate the average rating
        const averageRating =
            reviewResults.reduce((sum, review) => sum + review.Rating, 0) / reviewResults.length;

        // Respond with reviews and the average rating
        res.json({ reviews: reviewResults, averageRating });
    });
};
