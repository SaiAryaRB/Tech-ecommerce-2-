const connection = require('../database'); // Import database connection

// Add Review logic
exports.review = (req, res) => {
    console.log('Add Review request received'); // Debug log
    const { customerId, productId, reviewText, reviewRating } = req.body; // Get data from request body

    console.log(`Received customerId: ${customerId}, productId: ${productId}, reviewText: ${reviewText}, reviewRating: ${reviewRating}`); // Debug log

    if (!customerId || !productId || !reviewText || !reviewRating) {
        console.log('Missing required fields'); // Debug log
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Call the AddReview stored procedure
    connection.query(
        'CALL AddReview(?, ?, ?, ?);', 
        [customerId, productId, reviewRating, reviewText], 
        (err, results) => {
            if (err) {
                console.error('Database error:', err); // Debug log
                return res.status(500).json({ message: 'Internal server error' });
            }
            console.log('Review added successfully'); // Debug log
            res.status(200).json({ message: 'Review added successfully' });
        }
    );
};
