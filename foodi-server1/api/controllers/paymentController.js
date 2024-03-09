const mongoose = require('mongoose');
const Carts = require('../models/Carts');
const Payment = require('../models/payments');

const ObjectId = mongoose.Types.ObjectId;

// Process payment and delete cart items
exports.processPayment = async (req, res) => {
    const payment = req.body;

    try {
        const paymentRequest = await Payment.create(payment);

        // Delete cart after payments 
        const cartIds = payment.cartItems.map((id) => new ObjectId(id));
        const deleteCartRequest = await Carts.deleteMany({ _id: { $in: cartIds } });

        res.status(200).json({
            paymentRequest, deleteCartRequest
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get payments for a user
exports.getPayments = async (req, res) => {
    const email = req.query.email;
    const query = { email: email };

    try {
        const decodedEmail = req.decoded.email;
        if (email !== decodedEmail) {
            res.status(400).json({ message: 'Forbidden Access' });
        }

        const result = await Payment.find(query).sort({ createdAt: -1 }).exec();

        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
