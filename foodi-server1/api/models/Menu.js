const mongoose = require('mongoose');
const {Schema} = mongoose;


// create schema object for menu items 

const menuSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        minlength:3,

    },
    recipe: String,
    image: String,
    category: String,
    price : Number 


})

// craete a model object 
const Menu = mongoose.model("Menu", menuSchema)
module.exports  =Menu;