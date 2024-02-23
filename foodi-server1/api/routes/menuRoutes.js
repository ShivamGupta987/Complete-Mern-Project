const express = require('express')
const Menu = require('../models/Menu');
const menuController = require('../controllers/menuControllers');
const router = express.Router()
// get all menu items 

router.get ('/',menuController.getAllMenuItems)

// post a menu item
router.post('/', menuController.postMenuItem);

// delete a menu item
router.delete('/:id', menuController.deleteMenuItem);

// get single menu item
router.get('/:id', menuController.singleMenuItem);

// update single menu item
router.patch('/:id', menuController.updateMenuItem)



// export default used for import module.expprots used for const
module.exports = router ; 

