// controllers/reportController.js
const db = require('../database'); // Ensure this path is correct

// Generate report based on type


exports.customerreport = (req, res) => {
    const { reportType } = req.params; // Get the report type from the request parameters

    // Call the stored procedure
    db.query('CALL GenerateCustomerReport(?)', [reportType], (err, results) => {
        if (err) {
            console.error('Database error:', err); // Log the error for debugging
            return res.status(500).json({ message: 'Error generating customer report' });
        }
        
        // The results from the stored procedure may be in a specific format depending on your MySQL driver
        // If you're using mysql2, results[0] typically contains the first result set
        res.json(results[0]);
    });
};

exports.productreport = (req, res) => {
    const { reportType } = req.params; // Get the report type from the request parameters
    let { startDate, endDate } = req.query; // Get start and end dates from the query string

    // Check if startDate or endDate is empty or null
    if (!startDate || startDate.trim() === '') {
        startDate = '2000-01-01'; // Default to January 1st, 2000
    }
    if (!endDate || endDate.trim() === '') {
        const now = new Date();
        now.setDate(now.getDate() + 3);
        endDate = now.toISOString().split('T')[0]; // Set to current date in 'YYYY-MM-DD' format
    }

    // Log the start and end dates for debugging purposes
    console.log(`Generating report: ${reportType} from ${startDate} to ${endDate}`);

    // Call the stored procedure with report type and date filters
    db.query('CALL GetProductReports(?, ?, ?)', [reportType, startDate, endDate], (err, results) => {
        if (err) {
            console.error('Database error:', err); // Log the error for debugging
            return res.status(500).json({ message: 'Error generating product report' });
        }

        // The results from the stored procedure may be in a specific format depending on your MySQL driver
        // If you're using mysql2, results[0] typically contains the first result set
        res.json(results[0]);
    });
};

exports.categoryreport = (req, res) => {
    const { reportType } = req.params; // Get the report type from the request parameters
    let { startDate, endDate } = req.query; // Get start and end dates from the query string

    // Check if startDate or endDate is empty or null
    if (!startDate || startDate.trim() === '') {
        startDate = '2000-01-01'; // Default to January 1st, 2000
    }
    if (!endDate || endDate.trim() === '') {
        const now = new Date();
        now.setDate(now.getDate() + 3);
        endDate = now.toISOString().split('T')[0]; // Set to current date in 'YYYY-MM-DD' format
    }

    // Log the start and end dates for debugging purposes
    console.log(`Generating category report: ${reportType} from ${startDate} to ${endDate}`);

    // Call the stored procedure with report type and date filters
    db.query('CALL GetCategoryReports(?, ?, ?)', [reportType, startDate, endDate], (err, results) => {
        if (err) {
            console.error('Database error:', err); // Log the error for debugging
            return res.status(500).json({ message: 'Error generating category report' });
        }

        // The results from the stored procedure may be in a specific format depending on your MySQL driver
        // If you're using mysql2, results[0] typically contains the first result set
        res.json(results[0]);
    });
};

exports.salesreport = (req, res) => {
    const { reportType } = req.params; // Get the report type from the request parameters
    let { startDate, endDate } = req.query; // Get start and end dates from the query string

    // Check if startDate or endDate is empty or null
    if (!startDate || startDate.trim() === '') {
        startDate = '2000-01-01'; // Default to January 1st, 2000
    }
    if (!endDate || endDate.trim() === '') {
        const now = new Date();
        now.setDate(now.getDate() + 1); // Add one day to the current date
        endDate = now.toISOString().split('T')[0]; // Set to current date in 'YYYY-MM-DD' format
    }

    // Log the start and end dates for debugging purposes
    console.log(`Generating sales report: ${reportType} from ${startDate} to ${endDate}`);

    // Call the stored procedure with report type and date filters
    db.query('CALL GetSalesReports(?, ?, ?)', [reportType, startDate, endDate], (err, results) => {
        if (err) {
            console.error('Database error:', err); // Log the error for debugging
            return res.status(500).json({ message: 'Error generating sales report' });
        }

        // The results from the stored procedure may be in a specific format depending on your MySQL driver
        // If you're using mysql2, results[0] typically contains the first result set
        res.json(results[0]);
    });
};
