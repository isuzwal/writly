const express=require("express")
const writlyroutes=require("./routes/route")
const cors=require("cors")
const cookieParser = require("cookie-parser");
const databasae=require("./connetion")
const app=express()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
})); // allowing the origins
const PORT=process.env.PORT || 8000;

app.use(express.json())
app.use(cookieParser());
app.use("/writly",writlyroutes)
app.listen(PORT,()=>{
    console.log(`Sever start at Port ${PORT}`)
})