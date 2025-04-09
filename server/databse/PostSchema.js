const mongoose=require("mongoose")

const post=new mongoose.Schema({
      title:
      {
         type:String,
         required:[true,"Post must have title"],
         maxlength:150,
       },
      body:
      {
         type:String,
         required:true,
      },
      author:
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
         required:true
      },
      Image:
      {
         type:String,
      },
      likes: 
      {
         type: Number,
         default: 0, 
      },
      comments:
      [{
         user:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
      },
      text:
      {
         type:String,
         required:true,
      },
      }],
      createdAt: 
      {
         type: Date,
         default: Date.now,
      },
       updatedAt: Date,
},{timestamps:true})
const Post=mongoose.model("Post",post)
module.exports=Post;