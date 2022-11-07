const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { AuthModel } = require("../Models/Auth.Model");
const bcrypt = require("bcrypt");
require("dotenv").config()

const AuthRouter = Router();

AuthRouter.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 5, async function (err, hashedpassword) {
    if (err) {
      res.send({ msg: "Something Went Wronge" });
    }
    const newuser = new AuthModel({
      name,
      email,
      password: hashedpassword,
    });
    console.log(newuser)
    try{
        await newuser.save()
        res.send({"msg":"Signup Sucessfully"})
    }
    catch{
        res.send({"msg":"Error in Signup"})
    }
  });
});



AuthRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body

    const user= await AuthModel.findOne({email})
    if(!user){
        return res.send({"msg":"Invalid Details"})
    }
    const hashedpassword=user.password
    await bcrypt.compare(password,hashedpassword,function(err,result){
        if(err){
            res.send({"msg":"Something went Wronge"})

        }
        if (result == true) {
          const token = jwt.sign(
            { email: user.email, _id: user._id },process.env.SECRETKEY);
          return res.send({
            msg: "Login Successful",
            token: token,
            userId: user._id,
          });
        } else {
          res.send("Invalid Details");
        }
        
    })
    
})
module.exports = { AuthRouter };
