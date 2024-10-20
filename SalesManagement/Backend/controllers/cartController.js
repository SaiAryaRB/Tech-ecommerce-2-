const connection = require('../database'); // Import database connection

// Add product to cart logic
exports.cart = (req, res) => {
    console.log('Add to cart request received'); // Debug log
    const { customerId, productId, quantity } = req.body; // Get customerId, productId, and quantity from request body

    console.log(`Received customerId: ${customerId}, productId: ${productId}, quantity: ${quantity}`); // Debug log

    if (!customerId || !productId || !quantity) {
        console.log('Missing customerId, productId, or quantity'); // Debug log
        return res.status(400).json({ message: 'Customer ID, Product ID, and Quantity are required.' });
    }

    // Call the stored procedure to add product to cart
    connection.query(
        'CALL AddToCart(?, ?, ?)', 
        [customerId, productId, quantity], 
        (err, results) => {
            if (err) {
                console.error('Database error:', err); // Debug log
                return res.status(500).json({ message: 'Internal server error' });
            }

            const message = results[0][0].Message; // Adjust based on your stored procedure's output
            console.log('Stored procedure result:', message); // Debug log
            res.status(200).json({ message }); // Send success message back to the frontend
        }
    );
};
