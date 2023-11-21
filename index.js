const express =require("express")
require("dotenv").config();
const {userroute}=require("./route/user.route")
const {blogrouter}=require("./route/blog.route")
const {connection} =require("./db")
const app=express()
const cors = require("cors")
app.use(cors());
app.use(express.json())

app.get("/", (req,res) => {
    res.send("HOME PAGE");
  });

  app.use("/user", userroute);
app.use("/blog", blogrouter);





app.listen("1110",async ()=>{
    try {
        await connection
        console.log("connected to data-base")
        
    } catch (error) {
       console.log(error) 
    }
    console.log(`server is running at port ${process.env.port}`);
})