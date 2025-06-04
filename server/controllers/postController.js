const Post=require("../models/PostSchema");
const User=require("../models/Personschema");
const Notification=require("../models/Notification")
const Comment=require("../models/CommentSchema");
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
   if (!text && !image) {
  return res.status(400).json({ error: "Post must have either text or image." });
}
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
      .populate('user', 'username image likes comments').sort({ postTime: -1 }) ;
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
//--> Get post by PostId
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


// --> Get user post  there name 
exports.userPost=async(req,res)=>{
    try{
        const {username}=req.params;
        const userInfo=await User.findOne({username})
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
        console.log("From the username post not match ",e)
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
 const {postId,userId,text,commentId}=req.body
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
    comment: commentId, 
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
 res.status(200).json({
    status:true,
    message:`${user.username} comment on your post`,
    comment:savecomment,
    notifaction:savenotification
 })
 }catch(error){
    res.status(500).json({
        status:false,
        message:"Server error while comment on post",
        error:error.message
    })
 }
}

//  Fetching Comment on Sinlge Post Component
exports.getcomment=async(req,res)=>{
    try{
     const {postId,userId}=req.body;
     // condition check 
     if(!postId || !userId){
        return res.status(400).json({
            status:false,
            message:"Nedd Post ID and user ID",
        })
     }
   //  Search Post Id From Databse
   const usercomment=await Comment.find({post:postId})
   .populate("sender",'username profileImage text' )
    return res.status(200).json({
      status: true,
      data: usercomment,
    });
    }catch(e){
        res.status(500).json({
            status:false,
            message:"Server Eror WHILE Fetching User Comment ",
            error:error.message
        })
    }
}
 /// getting notifiaction
exports.getnotification=async(req,res)=>{
  try{
      const {username}=req.params
      if(!username){
          return res.status(400).json({
              status:false,
              message:"User name is required.",
            });
        }
        // check user is exits or not 
      const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    } 
   // then find notifiaction by user is which is eqaul to receiver_id 
  const notification=await  Notification.find({receiver:user._id})
  .populate("sender","username profileImage") // (path ,selecte) only two arrgument 
  .populate("comment","text")
  .sort({ notificationtime: -1 }) 
  .exec()
  res.status(200).json({
    status:true,
    notification:notification
  })
  }catch(error){
        console.log("Error at Fetching Comment ",error)
        res.status(500).json({
            status:false,
            message:"Internal server problem",
            error:error.message
      })
}
}

// unfollowed route

// Following and Followed logic
exports.follow = async (req, res) => {
  try {
    const { followedId, followingId } = req.body;
    if (!followedId || !followingId) {
      return res.status(400).json({
        status: false,
        message: "Need both user IDs",
      });
    }
    // Check if both users exist first
    const followedUser = await User.findById(followedId);   
    const followingUser = await User.findById(followingId);

    if (!followedUser || !followingUser) {
      return res.status(400).json({
        status: false,
        message: "One or both users not found.",
      });
    }
    // Check if already following
    if (followingUser.following && followingUser.following.includes(followedId)) {
      return res.status(400).json({
        status: false,
        message: "Already following this user",
      });
    }
    // Create notification
    const followNotification = new Notification({
      sender: followingUser._id,   // who followed
      receiver: followedUser._id,  // who was followed
      notificationtype: "follow",
    });
    await followNotification.save();
    await User.findByIdAndUpdate(followedId, {
      $addToSet: {
        followers: followingId, 
      },
    });

    await User.findByIdAndUpdate(followingId, {
      $addToSet: {
        following: followedId,  
      },
    });

    res.status(200).json({
      status: true,
      message:`${followedUser.username}  follow you `,
      data: followNotification,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || "Internal Server Error",
    });
  }
};
// Unfollow route - COMPLETELY FIXED
exports.unfollow = async (req, res) => {
  try {
    const { followedId, followingId } = req.body;

    if (!followedId || !followingId) {
      return res.status(400).json({  // Changed from 404 to 400
        status: false,
        message: "Need both User IDs"
      });
    }

    // Check if both users exist
    const followedUser = await User.findById(followedId);
    const followingUser = await User.findById(followingId);

    if (!followedUser || !followingUser) {
      return res.status(400).json({
        status: false,
        message: "One or both users not found.",
      });
    }

    // Check if currently following
    if (!followingUser.following || !followingUser.following.includes(followedId)) {
      return res.status(400).json({
        status: false,
        message: "Not currently following this user",
      });
    }
     await User.findByIdAndUpdate(followedId, {
      $pull: { follower: followingId },
    });
   await User.findByIdAndUpdate(followingId, {
      $pull: { following: followedId },
    });
 //  
 
 console.log("Done")
  res.status(200).json({
   status:true,
   message:"User unfollwed succesfully"
  })

   }catch(error){
    console.log("Error" ,error)
    res.status(500).json({
      status:false,
     message: error.message || "Internal Server Error",
    })
   } 
}
// remove the nofication from the DB
exports.removenotification=async(req,res)=>{
  try{
 const {id}=req.params;
  await Notification.findByIdAndDelete(id);
  res.status(200).json({ message: 'Notification deleted' });
  }catch(error){
  console.log("Error" ,error)
    res.status(500).json({
      status:false,
     message: error.message || "Internal Server Error",
    })
   } 
}

// post delete 