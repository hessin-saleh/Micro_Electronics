require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const bcrypt = require("bcrypt");
app.use(express.json());




const Prodect = require('./Moduls/Prodect')

async function conctionDB() {
  try {
    await mongoose.connect(process.env.URL);
    console.log("conction data bes");
  } catch (err) {
    console.log(err);
  }
}

conctionDB();
const User = require("./Moduls/User");

app.post("/regist", async (req, res) => {
  try {
    const { userName, email, passowerd, role } = req.body;
    if (!userName || !email || !passowerd) {
      return res.status(400).json({ msg: "data invalied" });
    }

    const eixesuser = await User.findOne({ email });
    if (eixesuser) {
      return res.status(400).json({ msg: "tihs user recording" });
    }

    const hasepassowerd = await bcrypt.hash(passowerd, 12);
    const user = await User.create({
      userName,
      email,
      passowerd: hasepassowerd,
      role
    });

    res.status(201).json({ msg: "create user", data: user });
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, passowerd } = req.body;
    if (email || passowerd) {
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(404)
          .json({ msg: "not account pleese creatc acoount" });
      const checkpassowerd = await bcrypt.compare(passowerd, user.passowerd);

      if (!checkpassowerd)
        return res.status(400).json({ msg: "inveld passowerd" });

      res.status(200).json({ msg: "scssful login" });
    }
  } catch (err) {
    console.log(err);
  }
});



app.post("/prodct", async(rqs,res) =>{
  try{const {prodctName,qunit,emailUser} = rqs.body
   const user = await User.findOne({ emailUser })
   if(user.role != "admin")  return res.status(400).json({ msg: "inveld Acsses" })
    const prodect = await Prodect.create({
      prodctName,
      qunit
    });
    res.status(201).json({ msg: "creating prodect" });
}
catch(err){console.log(err)}
})



app.get("/prodct", async(rqs,res) =>{
  try{
    
   const prodct = await Prodect.find()
   
    
    res.status(200).json({ msg: "creating prodect" , data: prodct});
}
catch(err){console.log(err)}
})
app.get("/sarch", async(rqs,res) =>{
  try{
    const { prodctName } = rqs.query;

//  const prodct = await Prodect.findOne({prodctName})
    const prodct = await Prodect.find({ 
      productName: { $regex: prodctName, $options: 'i' } 
    });

  
   
    
    res.status(200).json({ msg: "sarcing prodect" , data: prodct});
}
catch(err){console.log(err)}
})

app.listen(PORT, () => {
  console.log("Server Rinng ", PORT);
});
