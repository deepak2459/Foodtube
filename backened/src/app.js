//  create server

import express from "express" 
import cookieParser from "cookie-parser";

import connectDb from "./db/db.js"
 
import authroutes from "./routes/auth.routes.js"
 
// const authroutes = require("./routes/auth.routes.js")


connectDb();

const app = express() 
app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("hello world")
}) 

app.use("/api/auth",authroutes)
app.use("/api/food",foodroutes)

export default app