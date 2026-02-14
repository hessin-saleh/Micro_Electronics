const mongoose = require('mongoose')


const Userschema= new mongoose.Schema({
userName:{
    type:String,
    required:true,
    trim: true
},
email: {
    type:String,
    required:true,
    unique:true
},

passowerd:{
    type:String,
    required:true,
    minlength: 6
},
role:{
    type: String,
    enum:["user", "admin"],
    default: "user"
}
},
{timestamps:true})
const user = mongoose.model("User",Userschema)
module.exports = user