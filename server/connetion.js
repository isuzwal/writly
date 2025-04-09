const mongoose=require("mongoose")
require('dotenv').config();
const mongourl=process.env.DATABASE_URL;
//-> connection part
mongoose.connect(mongourl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("MongoDB Conected")
}).catch((e)=>{
    console.log("Monogo Connection Fail",e)
})

const databasae=mongoose.Connection

module.exports=databasae;
