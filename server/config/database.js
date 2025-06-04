const mongoose=require("mongoose")
require('dotenv').config();
// const mongourl=process.env.DATABASE_URL;
const mongourl="mongodb+srv://ujjwalgaihre0:fhC5sXB7hiuc4RRZ@cluster2.noot5uo.mongodb.net/blog-hub?retryWrites=true&w=majority&appName=Cluster2"
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
