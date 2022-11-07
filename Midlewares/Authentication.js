const jwt = require("jsonwebtoken")
require("dotenv").config()
const Authentication=(req,res,next)=>{
    const token=req.headers.authorization;
    // console.log(token)
    if(!token){
        res.send("Plese Login")
        
    }
    const verify = jwt.verify(token, process.env.SECRETKEY);

    if(verify){
        next()
    }
    else{
        res.send("Login again")
    }
}

module.exports = { Authentication };