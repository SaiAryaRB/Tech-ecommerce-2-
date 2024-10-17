/*const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define login route
router.post('/login', authController.login);

module.exports = router;*/

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define login route for customers
router.post('/login', authController.login);

// Define login route for admins
router.post('/admin/login', authController.adminLogin); // New route for admin login

module.exports = router;

