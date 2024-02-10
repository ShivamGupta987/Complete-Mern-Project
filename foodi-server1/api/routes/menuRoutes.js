const express = require('express')
const Menu = require('../models/Menu');
const menuController = require('../controllers/menuControllers');
const router = express.Router()
// get all menu items 

router.get ('/',menuController.getAllMenuItems)


// export default used for import module.expprots used for const
module.exports = router ; 

