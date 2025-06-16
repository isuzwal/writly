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
 // for the Post Images
const storage=new CloudinaryStorage({
    cloudinary:cloud, params:{
            folder:'writly/Post_Image',
            allowed_formats: ['jpg', 'png', 'jpeg']
    }
})
const uploadimage = multer({storage})
// for the Profile image 
const ProfileImage=new CloudinaryStorage({
    cloudinary:cloud,params:{
        folder:'writly/Profile_Image',
        allowed_formats:['jpg','png','jpeg']
    }
})
const ProfileImages=multer({storage:ProfileImage})
// for the CoverImage
const CoverImage=new CloudinaryStorage({
    cloudinary:cloud,params:{
        folder:'writly/Cover_Image',
        allowed_formats:['jpg','png','jpeg']
    }
})
const coverImage=multer({storage:CoverImage})
module.exports={uploadimage,ProfileImages ,coverImage}