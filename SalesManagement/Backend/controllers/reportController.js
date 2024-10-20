// controllers/reportController.js
const db = require('../database'); // Ensure this path is correct

// Generate report based on type
exports.generateReport = (req, res) => {
    const { type } = req.params;
    const { start, end } = req.query; // Get filter parameters from the query string

    let query = '';
    const queryParams = []; // To hold query parameters for prepared statements

    // Determine the SQL query based on the report type
    if (type === 'customer') {
        query = 'SELECT * FROM Customers'; // Modify as needed
    } else if (type === 'item') {
        query = 'SELECT * FROM Products'; // Modify as needed
    } else if (type === 'category') {
        query = 'SELECT * FROM Category'; // Modify as needed
    } else if (type === 'sales') {
        query = 'SELECT SalesID, CustomerID, SalesAmount, PaymentMethod, SalesDate FROM Sales'; // Updated query for sales report

        // Add date filtering if both dates are provided
        if (start && end) {
            query += ' WHERE SalesDate BETWEEN ? AND ?';
            queryParams.push(start, end); // Add the dates to the params array
        }
    } else if (type === 'topCustomers') {
        query = `
            SELECT Customers.Customer_ID, Customers.FirstName, Customers.LastName, SUM(Sales.SalesAmount) AS TotalSpent
            FROM Customers 
            JOIN Sales ON Customers.Customer_ID = Sales.CustomerID 
            GROUP BY Customers.Customer_ID 
            ORDER BY TotalSpent DESC 
            LIMIT 10;`;
    } else {
        return res.status(400).json({ error: 'Invalid report type' });
    }

    // Execute the query with parameters if available
    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Database error:', err); // Log the error for debugging
            return res.status(500).json({ message: `Error retrieving ${type} report` });
        }
        res.json(results);
    });
};
