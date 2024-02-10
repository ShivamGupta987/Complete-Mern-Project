const express = require("express");
const Carts = require('../models/Carts')
const router = express.Router()
const cartController = require('../controllers/cartController')
// const userController = require('../controllers/userController')

const verifyToken = require('../middleware/verifyToken')

router.get('/',cartController.getCartByEmail)
router.post('/',cartController.addTocart)
router.delete('/:id',cartController.deleteCart)
router.put('/:id',cartController.updateCart)
router.get('/:id',cartController.getSingleCart)




module.exports = router