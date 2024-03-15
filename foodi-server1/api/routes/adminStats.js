const express = require('express');
const router = express.Router();

// Import models
const User = require("../models/User");
const Menu = require("../models/Menu");
const Payment = require("../models/Payments"); 

// Middleware
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

// Get all orders, users, payments, menuItems length
router.get('/', async (req, res) => {
    try{
        const users = await User.countDocuments();
        const menuItems = await Menu.countDocuments();
        const orders = await Payment.countDocuments();

        const result = await Payment.aggregate([{
            $group: {
                _id : null,
                totalRevenue : {
                    $sum : '$price'
                }

            }
            
    }])
    const revenue= result.length > 0 ? result[0].totalRevenue : 0;

    res.status (200).json({
        users,
        menuItems,
        orders,
        revenue
    })


    }catch(erorr){
        res.status(200).send('Internal Server Error : ' + error.message );
    }
});

module.exports = router;
