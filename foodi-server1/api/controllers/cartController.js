const Carts = require("../models/Carts");


const getCartByEmail = async(req,res) =>{
    try{
        const email = req.query.email;
        
        const query = {email: email}
        const result = await Carts.find(query).exec()
        res.status(200).json(result)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}
// post a cart when add to cart btn click 
const addTocart = async(req,res) =>{
    const{menuItemId,name,recipe,image,price,quantity,email} = req.body
    try{
        // existing menu check item 

        const existingCartItem = await Carts.findOne({menuItemId});
        if(existingCartItem){
            return res.status(200).json({message:'product already exists in the cart!'})
        }

        const cartItem = await Carts.create({
            menuItemId,name,recipe,image,price,quantity,email
        })

        res.status(200).json(cartItem)

    }catch(error){
        res.status(500).json({message: error.message})
    }
}
// delete the acrt

const deleteCart = async(req,res) =>{
    const cartId = req.params.id;
    try{
        const deleteCart = await Carts.findByIdAndDelete(cartId)
        if(!deleteCart){
            res.status(401).json({message: "Cart Items not found!"})
        }
        return res.status(200).json({message : "Cart Item Deleted Successfully!"})
    }catch{
        res.status(500).json({message: error.message})
    }
};

// update a cart item 

const updateCart = async(req,res) =>{
    const cartId = req.params.id; 
    const{menuItemId,name,recipe,image,price,quantity,email} = req.body;
    try {
        const updatedCart = await Carts.findByIdAndUpdate(cartId,{
            menuItemId,name,recipe,image,price,quantity,email

        },{
            new:true , runValidators:true
        })
        if(!updatedCart){
            res.status(404).json({message: "Cart Items not found!"})
        }
        return res.status(200).json({message : updatedCart})

    }catch{
        res.status(500).json({message: error.message})

}
}


// get singler recipe 

const getSingleCart = async(req,res) =>{
    const cartId = req.params.id ;
    try{
        const cartItem = await Carts.findById(cartId)
        res.status(200).json(cartItem)

    }catch{
        res.status(500).json({message: error.message})
    }
}



module.exports = {
    getCartByEmail,
    addTocart ,
    deleteCart,
    updateCart,
    getSingleCart
}