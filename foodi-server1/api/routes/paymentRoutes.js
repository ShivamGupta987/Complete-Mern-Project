const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const paymentController = require('../controllers/paymentController');
const Payment = require('../models/Payments');

// Linking the route paths to their respective controller functions
router.post('/', verifyToken,  paymentController.processPayment);
router.get('/', verifyToken ,paymentController.getPayments);
// get all payments by user

router.get('/all',  paymentController.getAllPayments);

// confirm payment status 

router.patch('/:id',paymentController.getPaymentStatus)



module.exports = router;
