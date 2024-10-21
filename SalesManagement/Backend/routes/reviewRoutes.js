const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController'); 

// Route to add a review
router.post('/addreview', reviewController.review);

module.exports = router;
