const cloud=require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();
const multer = require("multer");
require('dotenv').config();

cloud.config({
    
    cloud_name:process.env.NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const storage=new CloudinaryStorage({
    cloudinary:cloud, params:{
            folder:'writly',
            allowed_formats: ['jpg', 'png', 'jpeg']
    }
})
const uploadimage = multer({storage})
module.exports=uploadimage