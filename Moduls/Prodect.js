const mongoose = require('mongoose')


const Projchema= new mongoose.Schema({
prodctName:{
    type:String,
    required:true,
    trim: true
},
qunit: {
    type:Number,
    required:true,
   
},
emailUser: {
    type:String,
    required:true,
   
},


},
{timestamps:true})
const prodect = mongoose.model("Prodect",Projchema)
module.exports = prodect

