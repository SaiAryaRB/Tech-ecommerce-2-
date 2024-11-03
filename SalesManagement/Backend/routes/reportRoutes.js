// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');



router.get('/reports/customer/:reportType', reportController.customerreport);

router.get('/reports/product/:reportType', reportController.productreport);

router.get('/reports/category/:reportType', reportController.categoryreport);

router.get('/reports/sales/:reportType', reportController.salesreport);

module.exports = router;
