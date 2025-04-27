const express=require("express")
const User=require("../databse/Personschema")
const Post=require("../databse/PostSchema")
const {verifytoken,token}=require("../jwt/jwt")
const route=express.Router()
const bcrypt=require("bcryptjs")
const {uploadimage} =require("../cloudStroage/cloud")

require('dotenv').config();

route.get("/",(req,res)=>{
    res.send("Welcome to Sever")
})

//->user-register route
route.post("/register",async(req,res)=>{
    const {username,email,password}=req.body
    try{
       const user=await User.findOne({username})
       if(user){
        return res.status(409).json({
            status:"Fali",
            message:"User already Already exits"
        })
       }
      const hasspassowrd=await bcrypt.hash(password,12)
      const newuser= await User.create({
      username:username,
      email:email,
      password:hasspassowrd,
  })
    const tokenValue=token({id:newuser._id})
    res.cookie("auth_token",tokenValue,{
        httpOnly:true,
        secure: true,
        // secure:process.env.NODE_ENV==="production",
        maxAge:10*24*60*60*1000,
        sameSite:"None",
        path:"/"
     })
    const { password: _, ...userWithoutPassword } = newuser._doc;
    res.status(201).json({
    status:"Succes",
    token:tokenValue,
    data:{
        user:userWithoutPassword
    },
    message:"User is create"
  })
    }catch(e){
        console.log("Error at the create user",e)
        res.status(500).json({
            status:"fail",
            message:"Server Error at "
        })
    }
})
//->login  route
route.post("/login",async(req,res)=>{
    const {username,password}=req.body
    try{
    const user=await User.findOne({username})
    if(!user){
       return res.status(404).json({
            status:"fail",
            message:"user not found"
        })
      
    }
    
    // comapring the userpassword 
    const comaprePassword=await bcrypt.compare(password,user.password) 
    if(!comaprePassword){
        return res.status(404).json({
            status:"fail",
            message:"Incorrect username or Password "
        })
    }
     const tokenValue=token({id:user._id})
     res.cookie("auth_token",tokenValue,{
        httpOnly:true,
        // secure: process.env.NODE_ENV === "production",
        secure: true,
        maxAge:10*24*60*60*1000,
        sameSite:"None",
        path:"/"
     })

     //->Remove the password fromt the response data showing case 
     res.status(200).json({ 
        status:"success",
        token: tokenValue,
        data:{
            user
        },
        message:"Login Successfully"
     })
    }catch(e){
        console.log("Can't login",e)
        res.status(500).json({
            status:"fail",
            message:"Internal Server Error"
        })
    }
})

//-> user  Profile route 
route.get("/profile",verifytoken,async(req,res)=>{
    try{
        const newuser=await User.findById(req.user.id).populate('post')
        if(!newuser){
           return  res.status(204).json({status:"Fail",msg:"User not Found"})
        }
        const {password ,...user}=newuser._doc
        res.status(200).json({
            status:"Success",
             userInfo:user

        })
    }catch(e){
        console.log("Error at Profile route",e)
        res.status(500).json({
            status:"Fail",
            msg:"Internal Error"})
        }
})
//-> post route
route.post("/post" ,verifytoken,async(req,res)=>{
    try{
        const {title,text,image,}=req.body
    const newPost=new Post({
        title:title,
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
        console.log("Error at the post",e)
        res.status(500).json({
            error:"Server error"
        })
    }
})
//--> for image upload
route.post("/upload",verifytoken ,uploadimage.single('image'),async(req,res)=>{
    try{
        const link=req.file.path
        res.json({ link:link});
       
    }catch(e){
        res.status(500).json({
            status:"Fail",
            msg:"Internal Sever Error"
        })
    }
})
// --> get all post
route.get("/blog", verifytoken,async(req,res)=>{
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
})
//--> for the single post show case
route.get("/blog/:id",verifytoken,async(req,res)=>{
    try{
        const post= await Post.findById(req.params.id).populate("user")
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
})
//->user
route.get("/user",verifytoken,async(req,res)=>{
    try{
        const userlist=await User.find({})
        if(userlist.length==0) {
             return  res.status(404).json({
                status:"Fail",
                msg:"No user lsit"
            })
        }
        const sanitizedUsers = userlist.map(user => {
            const { password, ...rest } = user._doc; // -> remove the password 
            return rest;
          });
        res.status(200).json({
            status:"Success",
            user:sanitizedUsers
        })
       
    }catch(e){
        console.log("Error at Fetching user",e)
        res.status(500).json({
             status:"Fail",
              msg:"Internal Server Error"
            })
     }
})
//-> for single user
route.get("/blog/user/:id",verifytoken,async(req,res)=>{
    try{
        const userInfo=await User.findById(req.params.id)
        .populate("post", "title text image like comment createdAt")
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
        console.log("Error at Profile route",e)
        res.status(500).json({
            status:"Fail",
            msg:"Internal Error"})
        }
})
module.exports=route