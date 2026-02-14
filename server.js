require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000; 

app.use(express.json())
async function conctionDB(){
try{
    await mongoose.connect(process.env.URL)
    console.log("conction data bes")
}
catch(err){
    console.log(err)
}
}


conctionDB()
const User = require("./Moduls/User")

app.post("/regist", async(req,res) => {
    try{

        const {userName, email,passowerd}= req.body
        if(!userName|| !email || !passowerd){
            return res.status(400).json({msg:"data invalied"})
        }

    }
    catch(err){}
})

app.listen(PORT,()=> {
console.log("Server Rinng")
})