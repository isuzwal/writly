const User=require("../models/Personschema");
const bcrypt=require("bcryptjs");
const {token}=require("../middleware/verifytoken");
const  Sendingverfiactioncode = require("../middleware/Email");
const { findByIdAndDelete } = require("../models/PostSchema");



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
      const verificationCode=Math.floor(1000+Math.random()*9000).toString();
      const newuser= new User({
      username,
      email,
      password:hasspassowrd,
      verificationCode,
      isVerified: false,
  })
       await newuser.save()
       Sendingverfiactioncode(email,verificationCode,username)
       res.status(201).json({
       status:"Succes",
       msg: "Registered successfully. Please verify your email."
  })

    }catch(e){
        console.log("Error at the create user",e)
        res.status(500).json({
            status:"Fail",
            message:"Can't ",
            error: error.message
        })
    }
}
//-> verfiaction code 
exports.sendVertification=async(req,res)=>{
    try{
    const {email,verificationCode}=req.body
    if(!email || !verificationCode){
        return res.status(400).json({
            status:"Fail",
            msg:"Email and verification code are  requried"
        })
      }    
    const exitsuser=await User.findOne({email}) 
    if (exitsuser.isVerified) {
        return res.status(409).json({
            status: "Fail",
            msg: "Email already verified."
        });
    }
   if(exitsuser.verificationCode !==verificationCode){
    return res.status(400).json({
        status:"Fail",
        msg:"Invaild Verifiaction code"
    })
   }
   exitsuser.isVerified=true;
   exitsuser.verificationCode=undefined;
   await exitsuser.save()
   const tokenValue = token({ id: exitsuser._id }); 
   res.cookie("auth_token", tokenValue, {
     httpOnly: true,
     secure: true,
     sameSite: "None",
     maxAge: 10 * 24 * 60 * 60 * 1000,
   });
   const { password, ...safeUser } = exitsuser._doc;
   return res.status(200).json({
     status: "Success",
     msg: "Email verified and logged in",
     user: safeUser,
    });
  
    
 }catch(error){
        return res.status(500).json({
            status:"Fail",
            msg:"Internal Server Error ",
            error: error.message
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
        secure:true,
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
    }catch(error){
        res.status(500).json({
            status:"Fail",
            error: error.message || "Some went Wrong While Login Process",
        })
    }
}
// --> get User Profile
exports.profile=async(req,res)=>{
    try{
        
        const dbuser=await User.findById(req.user.id).populate('post')
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
         status:false,
         msg:"Some thing Wrong While Geeting user Profile",
         error: error.message
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
        const sanitizedUsers = users.map(user => {
            const { password, ...rest } = user._doc; // -> remove the password 
            return rest;
          });
        res.status(200).json({
            status:true,
            user:sanitizedUsers
        })
       
    }catch(e){
        console.log("Error at Fetching user",e)
        res.status(500).json({
             status:false,
             msg:"Internal Server Error",
             error: error.message
        })
  }
}
// Get list of users the current user is following
// GET /api/user/following/:userId



// delete the account from the Data Base
exports.deleteaccount=async(req,res)=>{
    try{
    const userId=req.prams.id
    console.log("User id is ",userId)
    const deleteUser= await findByIdAndDelete(userId)
     if(!deleteUser){
      return res.status(404).json({
        status:false,
        error:"User Not Found"
        })
     }
     res.clearCookie("token")
     res.status(200).json({message:"Account delete successfully"})
    }catch(error){
       res.status(500).json({
             status:false,
             msg:"Fail to delete Account",
             error: error.message
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