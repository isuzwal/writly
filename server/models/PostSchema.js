const mongoose=require("mongoose")

const posts=new mongoose.Schema({
      text:{
         type:String,
          maxlength:200,
       },
      user:
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
         required:true
      },
      userimage:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'User'
      },
      image:
      { 
         type:String,
      },
      likes:[ 
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
      }],
      comments:
      [{
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }],
      createdAt: 
      {
         type: Date,
         default: Date.now,
      },
       updatedAt: Date,
},{timestamps:true})
const Post=mongoose.model("Post",posts)
module.exports=Post;