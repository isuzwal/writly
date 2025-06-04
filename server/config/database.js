const mongoose=require("mongoose")
require('dotenv').config();
 const mongourl=process.env.DATABASE_URL;

//-> connection part
const databaseconnection=async()=>{
    try{
  await  mongoose.connect(mongourl);
    console.log(" MongoDB Connected");
    }catch(e){
        console.error("MongoDB Connection Failed", e.message);
        process.exit(1); 
    }
}


module.exports = databaseconnection;
