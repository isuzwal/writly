const Post=require("../models/PostSchema");
const User=require("../models/Personschema");
const uploadimage=require("../cloudStroage/cloud")
require('dotenv').config();
//->Post route 
exports.postcreate=async(req,res)=>{
    try{
        const {text,image,}=req.body
        const newPost=new Post({
        text:text,
        image:image,
        user:req.user.id,   
    })
    const postsaved=await newPost.save()
    await postsaved.populate('user', 'username');
    // adding the user post to userScheama
    await User.findByIdAndUpdate(req.user.id,{
        $push:{post:postsaved._id}
    });
    res.status(200).json({
        status:"succes",
        data:{
            postsaved
        }
    })
    }catch(e){
        console.log("Error at the post Fuck route ",e)
        res.status(500).json({
            error:"Server error"
        })
    }
}
// -->for all post
exports.getAllposts=async(req,res)=>{
    try{
        const allpost= await Post.find({})
           .populate('user', 'username image likes comments');
            res.status(200).json({
               status:"sucess",
               data:{
                post:allpost
               }
        })
    }catch(e){
        console.log("Internal Error",e)
        res.status(500).json({
            error:"Interanl Server Error"
        })
    }
}
//--> get post by id
exports.getPostByID=async(req,res)=>{
    try{
      
        const post = await Post.findById(req.params.id)
      .populate("user", "username profileImage follower");
        if(!post){
            return  res.status(404).json({error:"Post not found"})
        }
        res.status(200).json({
            status:"success",
            data:{
                post
            }
        })
    }catch(e){
        console.log("Error at Fetching Post",e)
        res.status(500).json({"error":"Server Error"})
    }
}


// --> get user post by there name 
exports.userPost=async(req,res)=>{
    try{
        const {username}=req.params;
        const userInfo=await User.findOne({username:username})
        .populate("post")
          if(!userInfo){
             return   res.status(404).json({
                status:'Fail',
               msg:"User Info can't Fetch"
            })
          }
          const {password ,...user}=userInfo._doc
         res.status(200).json({
             status:"Success",
             userInfo:user

        })
    }catch(e){
        console.log("Error at Blog route ",e)
        res.status(500).json({
            status:"Fail",
            msg:"Internal Error"})
        }
}

//--> for the image upload
exports.imageupload=uploadimage.single('image'),async(req,res)=>{
    try{
        const link=req.file.path
        res.json({ link:link});
       
    }catch(e){
        res.status(500).json({
            status:"Fail",
            msg:"Internal Sever Error"
        })
    }
}