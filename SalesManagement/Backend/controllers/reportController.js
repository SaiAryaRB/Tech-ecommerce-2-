const db = require('../database'); // Ensure this path is correct

// Function to format date to local time in 'YYYY-MM-DD HH:MM:SS' format
const formatDateToLocal = (date) => {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    return new Date(date).toLocaleString('en-CA', options).replace(',', '');
};

// Modify date fields in results to local time format
const formatResultsToLocalTime = (results) => {
    return results.map(row => {
        if (row.SalesDate) {
            row.SalesDate = formatDateToLocal(row.SalesDate);
        }
        return row;
    });
};

// Generate report based on type
exports.customerreport = (req, res) => {
    const { reportType } = req.params;

    db.query('CALL GenerateCustomerReport(?)', [reportType], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Error generating customer report' });
        }
        
        const formattedResults = formatResultsToLocalTime(results[0]);
        res.json(formattedResults);
    });
};

exports.productreport = (req, res) => {
    const { reportType } = req.params;
    let { startDate, endDate } = req.query;

    if (!startDate || startDate.trim() === '') startDate = '2000-01-01';
    if (!endDate || endDate.trim() === '') {
        const now = new Date();
        now.setDate(now.getDate() + 3);
        endDate = now.toLocaleDateString('en-CA');
    }

    console.log(`Generating report: ${reportType} from ${startDate} to ${endDate}`);

    db.query('CALL GetProductReports(?, ?, ?)', [reportType, startDate, endDate], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Error generating product report' });
        }

        const formattedResults = formatResultsToLocalTime(results[0]);
        res.json(formattedResults);
    });
};

exports.categoryreport = (req, res) => {
    const { reportType } = req.params;
    let { startDate, endDate } = req.query;

    if (!startDate || startDate.trim() === '') startDate = '2000-01-01';
    if (!endDate || endDate.trim() === '') {
        const now = new Date();
        now.setDate(now.getDate() + 3);
        endDate = now.toLocaleDateString('en-CA');
    }

    console.log(`Generating category report: ${reportType} from ${startDate} to ${endDate}`);

    db.query('CALL GetCategoryReports(?, ?, ?)', [reportType, startDate, endDate], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Error generating category report' });
        }

        const formattedResults = formatResultsToLocalTime(results[0]);
        res.json(formattedResults);
    });
};

exports.salesreport = (req, res) => {
    const { reportType } = req.params;
    let { startDate, endDate } = req.query;

    if (!startDate || startDate.trim() === '') startDate = '2000-01-01';
    if (!endDate || endDate.trim() === '') {
        const now = new Date();
        now.setDate(now.getDate() + 1);
        endDate = now.toLocaleDateString('en-CA');
    }

    console.log(`Generating sales report: ${reportType} from ${startDate} to ${endDate}`);

    db.query('CALL GetSalesReports(?, ?, ?)', [reportType, startDate, endDate], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Error generating sales report' });
        }

        const formattedResults = formatResultsToLocalTime(results[0]);
        res.json(formattedResults);
    });
};
