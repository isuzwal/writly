const mongoose=require("mongoose")

const post=new mongoose.Schema({
   content:
      {
         type:String,
         required:[true,"Post must have title"],
         maxlength:150,
       },
      user:
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
      [{
       type: mongoose.Schema.Types.ObjectId,
       ref: "User"
      }],
      comments:
      [{
         user:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
      },
      text:String,
      createdAt:{type:Date,},
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