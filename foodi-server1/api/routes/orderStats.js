const express = require('express');
const router = express.Router();


// Import models
const User = require("../models/User");
const Menu = require("../models/Menu");
const Payment = require("../models/Payments"); 

// middleawer
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

// get all orders ststs

router.get('/',async(req,res)=> {
    try{

       
        const result = await Payment.aggregate([
            {
                $unwind: '$menuItems'

            },
            {
                $lookup : {
                    from : 'menus',
                    localField : 'menuItems',
                    foreignField : "_id",
                    as: 'menuItemDetails',
                }
            },
            {
                $unwind : '$menuItemDetails'
            },
            {
                $group : {
                    _id:'$menuItemDetails.category',
                    quantity : {$sum : '$quantity'},
                    revenue : {$sum :'$price'}
                }
            },

            {
                $project : {
                    _id : 0,
                    category : '$_id',
                    quantity : '$quantity',
                    revenue :  '$revenue'
                   
                }
            }
            
                
            
            
    ]);
    res.json(result)

    }catch(error){
        res.status(200).send('Internal Server Error : ' + error.message );

    }
})

module.exports = router;
