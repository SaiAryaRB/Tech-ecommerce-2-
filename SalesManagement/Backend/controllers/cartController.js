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

// Update product quantity in cart logic
exports.updatecart = (req, res) => {
    console.log('Update cart quantity request received'); // Debug log
    const { customerId, productId, newQuantity } = req.body; // Get customerId, productId, and newQuantity from request body

    console.log(`Received customerId: ${customerId}, productId: ${productId}, newQuantity: ${newQuantity}`); // Debug log

    if (!customerId || !productId || newQuantity === undefined) {
        console.log('Missing customerId, productId, or newQuantity'); // Debug log
        return res.status(400).json({ message: 'Customer ID, Product ID, and New Quantity are required.' });
    }

    // Call the stored procedure to update product quantity in cart
    connection.query(
        'CALL UpdateCartQuantity(?, ?, ?)', 
        [customerId, productId, newQuantity], 
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

// Delete product from cart logic
exports.deletecart = (req, res) => {
    console.log('Delete from cart request received'); // Debug log
    const { customerId, productId } = req.body; // Get customerId and productId from request body

    console.log(`Received customerId: ${customerId}, productId: ${productId}`); // Debug log

    if (!customerId || !productId) {
        console.log('Missing customerId or productId'); // Debug log
        return res.status(400).json({ message: 'Customer ID and Product ID are required.' });
    }

    // Call the stored procedure to delete product from cart
    connection.query(
        'CALL DeleteFromCart(?, ?)', 
        [customerId, productId], 
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
