const express=require("express")
const cors=require("cors")
const cookieParser = require("cookie-parser");
const databaseconnection=require("../config/database")
const UserRoutes=require("../routes/userRouter")
const PostRoutes=require("../routes/postRouter")
const app=express()
require("dotenv").config();


app.use(cors({
    origin:["https://writly-dot.vercel.app","http://localhost:5173"],
    methods: [ 'GET','POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true,
})); // allowing the origins

const PORT=process.env.PORT || 8000;

app.use(express.json())
app.use(cookieParser());

databaseconnection();
// Root route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Server - API is running!" });
});

app.use("/api",UserRoutes);
app.use("/api",PostRoutes)


app.get("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});
module.exports=app;


// app.listen(PORT,()=>{
//     console.log(`Server started at Port ${PORT}`)
//  }) 
 