//  create server
import  dotenv from  "dotenv"
dotenv.config()
import cors from "cors"
 
import express from "express" 
import cookieParser from "cookie-parser";
 

import connectDb from "./db/db.js";
 connectDb()
// import authroutes from "auth.routes.js"
// import foodroutes from "../routes/food.routes.js"
import authroutes from "./routes/auth.routes.js"
import foodroutes from "./routes/food.routes.js"
import foodpartnerIdroute from "./routes/foodpartnerId.route.js"                

 
// const authroutes = require("./routes/auth.routes.js")

 
 
const app = express() 
app.use(cors({
    origin:"http://localhost:5173",
   
    credentials:true
}))  

//  middleware
app.use(express.json())
app.use(cookieParser())
 

app.get("/",(req,res)=>{
    res.send("hello world")
}) 

app.use("/api/auth",authroutes)
app.use("/api/food",foodroutes)
app.use("/api/foodpartner",foodpartnerIdroute)

export default app