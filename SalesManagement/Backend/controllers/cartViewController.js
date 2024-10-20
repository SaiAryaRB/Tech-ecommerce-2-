const connection = require('../database'); // Import database connection

// Retrieve cart details for a customer
exports.cartinfo = (req, res) => {
    console.log('Retrieve cart details request received'); // Debug log
    const { customerId } = req.body; // Get customerId from request body

    console.log(`Received customerId: ${customerId}`); // Debug log

    if (!customerId) {
        console.log('Missing customerId'); // Debug log
        return res.status(400).json({ message: 'Customer ID is required.' });
    }

    // Call the stored procedure to retrieve cart details for the customer
    connection.query(
        'CALL GetCustomerCart(?)', 
        [customerId], 
        (err, results) => {
            if (err) {
                console.error('Database error:', err); // Debug log
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results[0].length === 0) {
                console.log('No cart found for this customer'); // Debug log
                return res.status(404).json({ message: 'No cart found for this customer' });
            }

            const cartDetails = results[0]; // Retrieve cart details from results
            console.log('Stored procedure result:', cartDetails); // Debug log
            res.status(200).json(cartDetails); // Send cart details back to the frontend
        }
    );
};
