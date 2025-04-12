const express=require("express")
const User=require("../databse/Personschema")
const Post=require("../databse/PostSchema")
const {verifytoken,token}=require("../jwt/jwt")
const route=express.Router()
const bcrypt=require("bcryptjs")

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
        secure:true,
        maxAge:10*24*60*60*1000,
        sameSite:"None"
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
//-> for ther login  route
route.post("/login",async(req,res)=>{
    const {username,password}=req.body
    try{
    const user=await User.findOne({username})
    if(!user){
        res.status(404).json({
            status:"fail",
            message:"user not found"
        })
      
    }
    // comapring the userpassword 
    const comaprepassword=bcrypt.compare(password,user.password) 
  if(comaprepassword){
     const tokenValue=token({id:user._id})
     res.cookie("auth_token",tokenValue,{
        httpOnly:true,
        secure:true,
        maxAge:10*24*60*60*1000,
        sameSite:"None"
     })
     //->Remove the password fromt the response data showing case 
     const {password: _, ...userwithoutPassword}=user._doc
     res.status(200).json({ 
        status:"success",
        token: tokenValue,
        data:{
            user:userwithoutPassword

        },
        message:"Login Successfully"
     })
    }else{
      res.status(400).json({
      status:"fail",
      message:"Username and password wrong"
      })
    }
    }catch(e){
        console.log("Can't login",e)
        res.status(500).json({
            status:"fail",
            message:"Internal Server Errro"
        })
    }
})
//->for the Profile by the id 
route.get("/profile/:id",async(req,res)=>{
    try{
        const user= await User.findById((req.params.id));
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            });
        }
         res.status(200).json({
            status:"succes",
            data:{
                user
                }
         })
    }catch(e){
        console.log("Can't find user",e)
        res.status(500).json({
            status:"fail",
            message:"Sever Error"
        })
    }
})
//->Profile of the usres

route.get("/profile/:id",async(req,res)=>{
    try{
        //-> first get user
      const user = await User.findById(req.params.id).select("-password");//-> select tell that do not send the password to response 
        
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const userAllpost = await Post.find({ author: req.params.id });
     if(!userAllpost){
        return res.status(404).json({
         error:"Can't get user profile"
         })
       }
      res.status(200).json({
      status:"success",
      data:{
        user,//->user
        userAllpost //-> and posts
       }
     })
    }catch(e){
        console.log("Can't find user",e)
        res.status(500).json({
            status:"fail",
            message:"Server Error"
        })
    }
})

//-> post route
route.post("/post" ,verifytoken,async(req,res)=>{
    try{
        const {title,body,image,}=req.body
    if(!title || !body){
        return res.status(400).json({
            error:"Title and body are required"
        })
    }
    const newPost=new Post({
        title,
        body,
        Image:image,
        // this will be change by Jwt auth token 
        author:"67f6e79ccbd964ea0101ec84"
    })
    const postsaved=await newPost.save()
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
// --> get all post
route.get("/blog",async(req,res)=>{
    try{
        const allpost= await Post.find({})
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
route.get("/blog/:id",async(req,res)=>{
    try{
        const post= await Post.findById(req.params.id)
        .populate("author","username Image",)
        if(!post){
            return  res.status(404).json({error:"Post not found"})
        }
        res.status(200).json({
            status:"succes",
            data:{
                post
            }
        })
    }catch(e){
        console.log("Error at Fetching Post",e)
        res.status(500).json({"error":"Server Error"})
    }
})
module.exports=route