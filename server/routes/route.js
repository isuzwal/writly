const express=require("express")
const User=require("../databse/Personschema")
const route=express.Router()
const bcrypt=require("bcryptjs")

require('dotenv').config();

route.get("/",(req,res)=>{
    res.send("Welcome to Sever Fuck")
})

//->user-register route
route.post("/register",async(req,res)=>{
    const {username,email,password}=req.body
    
    try{
       const user=await User.findOne({username})
       if(user){
        return res.status({
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
  res.status(201).json({
    status:"Succes",
    data:{
        user:newuser
    },
    message:"User is create"
  })
    }catch(e){
        console.log("Error at the create user",e)
        res.status(500).json({
            status:"fail",
            message:"Error at user creation "
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
     res.status(200).json({ 
        status:"success",
        data:{
            user
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
        consol.log("Can't login",e)
        res.status(500).json({
            status:"fail",
            message:"Innternal Server Errro"
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
            message:"Fali to load User"
        })
    }
})
//->upadata the profile info
// route.patch("/profile/:id",async(req,res)=>{
//     try{
//         const updateuser= await User.findByIdAndUpdate(
//             req.params.id,
//             {$set:req.body},
//             {new:true,runValidators:true},
//         );
//         console.log(req.body) 
//         if(!updateuser){
//             return res.status(404).json({
//                 status: "fail",
//                 message: "User not found"
//             }); 
//         }
//         // if (!user) {
//         //     return res.status(404).json({
//         //         status: "fail",
//         //         message: "User not found"
//         //     });
//         // }
//          res.status(200).json({
//             status:"succes",
//             data:{
//              user: updateuser
//             }
//          })

//     }catch(e){
//         console.log("Can't find user",e)
//         res.status(500).json({
//             status:"fail",
//             message:"Fali to update  User"
//         })
//     }
// })
module.exports=route