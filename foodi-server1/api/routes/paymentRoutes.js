const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const paymentController = require('../controllers/paymentController');

// Linking the route paths to their respective controller functions
router.post('/', verifyToken, paymentController.processPayment);
router.get('/', verifyToken, paymentController.getPayments);

module.exports = router;
