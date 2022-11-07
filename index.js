const express =require("express")
require("dotenv").config()
const cors=require("cors")
const PORT = process.env.PORT || 8080;
const {connection}=require("./Config/db");
const { AuthRouter } = require("./Routers/AuthRouter");
const app = express();
app.use(express.json());
app.use(cors())
app.use("/",AuthRouter)

app.get("/",(req,res)=>{
    req.send("Home Page")
})

app.listen(PORT,async()=>{
    await connection;
    try{
        console.log("Connected to DB")
    }
    catch{
        console.log("Error in DB")
    }
    console.log(`Running on Port ${PORT}`)
})