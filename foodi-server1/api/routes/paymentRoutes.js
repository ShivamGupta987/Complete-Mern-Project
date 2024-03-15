const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const paymentController = require('../controllers/paymentController');
const Payment = require('../models/payments');

// Linking the route paths to their respective controller functions
router.post('/',  paymentController.processPayment);
router.get('/',  paymentController.getPayments);
// get all payments by user

router.get('/all',  paymentController.getAllPayments);

// confirm payment status 

router.patch('/:id',paymentController.getPaymentStatus)



module.exports = router;
