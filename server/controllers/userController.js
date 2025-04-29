const User=require("../models/Personschema");
const bcrypt=require("bcryptjs");
const {token}=require("../middleware/verifytoken");
const  Sendingverfiactioncode = require("../middleware/Email");


//-->user register
exports.register=async(req,res)=>{
    try{
       const {username,email,password}=req.body
       if(!username || !email||!password){
         return  res.status(400).json({
            status:"Fail",
            msg:"All fields are required"
        })
       }
       const user=await User.findOne({username})
       if(user){
        return res.status(409).json({
            status:"Fail",
            message:"User already Already exits Please Login"
        })
       }
      const hasspassowrd=await bcrypt.hash(password,12)
      const verficationCode=Math.floor(1000+Math.random()*9000).toString();
      const newuser= new User({
      username,
      email,
      password:hasspassowrd,
      verficationCode:verficationCode
  })
       await newuser.save()
       Sendingverfiactioncode(newuser.email,verficationCode,newuser.username)
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
    data:{
        user:userWithoutPassword
    },
    message:"User register successfuly"
  })
    }catch(e){
        console.log("Error at the create user",e)
        res.status(500).json({
            status:"Fail",
            message:"Internal Server Error"
        })
    }
}
//-->login user
exports.login=async(req,res)=>{
    try{
     const {username,password}=req.body
     if(!username || !password){
        return res.status(400).json({
            status:"Fail",
            msg:"All  Field are requried"
        })
     }
     const user=await User.findOne({username})
     if(!user){
       return res.status(404).json({
            status:"Fail",
            message:"User not found"
        })
      
    } 
    // comapring the userpassword 
    const isMatchpassword=await bcrypt.compare(password,user.password) 
    if(!isMatchpassword){
        return res.status(404).json({
            status:"Fail",
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
        status:"Success",
        data:{user},
        message:"Login Successfully"
     })
    }catch(e){
        console.log("Can't login",e)
        res.status(500).json({
            status:"Fail",
            message:"Internal Server Error"
        })
    }
}
// --> get User Profile
exports.profile=async(req,res)=>{
    try{
        const dbuser=await User.findById(req.user._id).populate('post')
        if(!dbuser){
           return  res.status(404).json({status:"Fail",msg:"User not Found"})
        }
        const {password ,...userwithoutpass}=dbuser._doc
        res.status(200).json({
            status:"Success",
             userInfo:userwithoutpass

        })
    }catch(e){
        console.log("Can't get user",e)
        res.status(500).json(
        {
         status:"Fail",
         msg:"Internal Server error"
        })
    }
}
//--> get userslist
exports.getuserlist=async(req,res)=>{
    try{
        const users=await User.find({})
        if(!users.length) {
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
}
//--> logout user
exports.logout=(req, res) => {
    res
      .clearCookie('auth_token')
      .status(200)
      .json({ status: 'Success', msg: 'Logged out successfully' });
  };