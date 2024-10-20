const connection = require('../database'); // Import the direct connection

// Function to fetch customer details along with phone numbers, reviews, and sales
const details = (req, res) => {
    const { customerId } = req.body; // Retrieve customerId from request body
    console.log('customerId from request:', customerId);

    if (!customerId) {
        return res.status(400).json({ error: "Customer not logged in." });
    }

    // Query to fetch customer details excluding password
    connection.query(
        `SELECT Customer_ID, FirstName, LastName, Email, CreatedDate, House_Number, Street_Name, Pincode, City 
         FROM customers 
         WHERE Customer_ID = ?`, [customerId], (err, customer) => {
            if (err) {
                console.error('Error fetching customer details:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (!customer.length) {
                return res.status(404).json({ error: "Customer not found." });
            }

            // Query to fetch customer phone numbers
            connection.query(
                `SELECT Phone_Number 
                 FROM customer_phone 
                 WHERE Customer_ID = ?`, [customerId], (err, phoneNumbers) => {
                    if (err) {
                        console.error('Error fetching phone numbers:', err);
                        return res.status(500).json({ error: 'Internal server error' });
                    }

                    // Query to fetch reviews and product names
                    connection.query(
                        `SELECT r.ReviewText, r.Rating, p.Product_Name 
                         FROM review r 
                         JOIN products p ON r.ProductID = p.Product_ID 
                         WHERE r.CustomerID = ?`, [customerId], (err, reviews) => {
                            if (err) {
                                console.error('Error fetching reviews:', err);
                                return res.status(500).json({ error: 'Internal server error' });
                            }

                            // Query to fetch sales and products sold in each sale
                            connection.query(
                                `SELECT s.SalesID, s.SalesAmount, s.PaymentMethod, s.SalesDate, ps.Quantity, p.Product_Name, ps.UnitPrice
                                 FROM sales s
                                 JOIN product_sales ps ON s.SalesID = ps.Sales_ID
                                 JOIN products p ON ps.Product_ID = p.Product_ID
                                 WHERE s.CustomerID = ?`, [customerId], (err, sales) => {
                                    if (err) {
                                        console.error('Error fetching sales data:', err);
                                        return res.status(500).json({ error: 'Internal server error' });
                                    }

                                    // Combine all the data and send the response
                                    res.status(200).json({ 
                                        customer: customer[0], // Return the first customer object
                                        phoneNumbers, 
                                        reviews, 
                                        sales 
                                    });
                                });
                        });
                });
        });
};

module.exports = { details };
