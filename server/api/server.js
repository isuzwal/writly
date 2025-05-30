const express=require("express")
const cors=require("cors")
const cookieParser = require("cookie-parser");
const databaseconnection=require("../config/database")
const UserRoutes=require("../routes/userRouter")
const PostRoutes=require("../routes/postRouter")
const serverless = require('serverless-http');
const app=express()
const route=express.Router()

app.use(cors({
    origin:"https://writly-dot.vercel.app",
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    
    // allowedHeaders: ['Content-Type', 'Authorization']
})); // allowing the origins

const PORT=process.env.PORT || 8000;

app.use(express.json())
app.use(cookieParser());

databaseconnection();

route.get("/",(req,res)=>{
    res.send("Welcome to Sever")
})


app.use("/api",UserRoutes);
app.use("/api",PostRoutes)

// const serverless = require("serverless-http");
// module.exports.handler = serverless(app);
module.exports=app;

// app.listen(PORT,()=>{
//     console.log(`Server started at Port ${PORT}`)
 // }) 