const mongoose=require("mongoose")

const post=new mongoose.Schema({
   title:
      {
         type:String,
         required:[true,"Post must have title"],
         maxlength:20,
       },
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
      likes: 
      {
       type: Number,
      },
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