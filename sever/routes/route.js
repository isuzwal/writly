const express=require("express")
const User=require("../databse/Personschema")
const route=express.Router()
route.get("/",(req,res)=>{
    res.send("Welcome to Sever")
})

//->userlogin route
route.post("/register",async(req,res)=>{
    const {username,email,password}=req.body
    try{
    const newuser= await User.create({
      username:username,
      email:email,
      password:password,
  })
  res.status(201).json({
    status:"Succes",
    data:{
        user:newuser
    },
    message:"User create"
  })

    }catch(e){
        console.log("Error at the create user",e)
        res.status(500).json({
            status:"fail",
            message:"Error at user creation "
        })
    }
})
//->for the Profile 
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
route.patch("/profile/:id",async(req,res)=>{
    try{
        const updateuser= await User.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true,runValidators:true},
        );
        console.log(req.body) 
        if(!updateuser){
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            }); 
        }
        // if (!user) {
        //     return res.status(404).json({
        //         status: "fail",
        //         message: "User not found"
        //     });
        // }
         res.status(200).json({
            status:"succes",
            data:{
             user: updateuser
            }
         })
         await updateduser.save()
    }catch(e){
        console.log("Can't find user",e)
        res.status(500).json({
            status:"fail",
            message:"Fali to update  User"
        })
    }
})
module.exports=route