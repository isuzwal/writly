const Post=require("../models/PostSchema");
const User=require("../models/Personschema");
const Notification=require("../models/Notification")
const Comment=require("../models/CommentSchema");
const comment = require("../models/CommentSchema");
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
        status:"Post Create",
        data:{
            postsaved
        }
    })
    }catch(e){
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
        // console.log("Error at Fetching Post",e)
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
       
        res.status(500).json({
            status:"Fail",
            msg:"Internal Error"})
        }
}

//--> for the image upload
exports.imageupload = async(req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          status: "Fail",
          msg: "No file uploaded"
        });
      }
      const link = req.file.path;
      res.json({ link: link });
      
    } catch(e) {
      res.status(500).json({
        status: "Fail",
        msg: "Internal Server Error"
      });
    }
  };
  
  //  like notifaction
  exports.likesnotifcation=async(req,res)=>{
   try{
      const {userId,postId}=req.body;
    // first find that user is there or not in body at request time or not  
    if(!userId || !postId){
      return res.status(400).json({
          success:false,
          message:"UserID and PostID is  requried"
      })
    }
    // find post is persent or not DB
     const post=await Post.findById(postId);
     if(!post){
      return res.status(404).json({
          status:false,
          message:"Post Not Found"
      })
     }
 
     // Check the user is Presnet or not at DB
     const user=await User.findById(userId);
     if(!user){
      return res.status(404).json({
          status:false,
          message:"User not Exits"
      })
     }
     // create notifaction
     const notifaction=new Notification({
      notificationtype:"like",
      sender:userId,
      post:postId,
      receiver:post.user,
     })
     // saving the notification
     const savenotification=await notifaction.save();
     // checking the user have already like that post or not if not then push it 
    // to post.likes arrary of PostSchema.
//    
   await Post.findByIdAndUpdate(
    postId,{
        $addToSet:{likes:userId},
        $push:{notifiaction:savenotification._id}
    }
   );
   await User.findByIdAndUpdate(userId,{
    $addToSet:{likedpost:postId}
   })
     res.status(200).json({
      status:true,
      message:`${user.username} liked your post`,
      notifaction:savenotification
     })
     console.log("Save Post",savenotification)
   }catch(error){
    console.error("Error at Backend Process:", error);
      res.status(500).json({
        success: false,
        message: "Server error while processing like notification",
        error: error.message
   })
   }
  }
  // comment notification
  exports.commentnotification=async(req,res)=>{
 try{
 const {postId,userId,text}=req.body
 if(!userId||!postId||!text){
    return res.status(400).json({
        status:false,
        message:"All filed are requried"
    })  
 }
 // find that post which one user is commenton that post
 const post= await Post.findById(postId);
 if(!post){
      return res.status(400).json({
        status:false,
        message:"Post not Exits"
    })
 }
 // same for the userId
 const user=await User.findById(userId);
 if(!user){
    return res.status(400).json({
        status:true,
        message:"User not exits"
    })
 }
 // create the comment 
 const commentnotification=new  Comment({
    post:postId,
    sender:userId,
    receiver:post.user,
    text:text,
 })
 const savecomment=await commentnotification.save()
   // Create Notifaction for Comment 
   const notifaction=new Notification({
    notificationtype:"comment",
    sender:userId,
    receiver:post.user,
    post:postId,
    comment:savecomment._id,
   })
   const savenotification=await notifaction.save()
 // post $push 
 await Post.findByIdAndUpdate(postId,{
    $push:{
        comments:notifaction._id,
        notifiaction:savecomment._id
    }
 })
 // user $push
//  await User.findByIdAndUpdate(userId,{
//     $addToSet:{comments:postId}
//  })
 res.status(200).json({
    status:true,
    message:`${user.username} comment on your post`,
    comment:savecomment,
    notifaction:savenotification
 })
 }catch(error){
    console.log("At the Comment route",error)
    res.status(500).json({
        status:false,
        message:"Server error while comment on post",
        error:error.message
    })
 }
}
//  for Testing the route 
