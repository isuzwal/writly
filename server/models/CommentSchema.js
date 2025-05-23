const mongoose=require("mongoose")

const Comment=new mongoose.Schema({
    text:{
        type:String,
        required:true,
        trim:true,
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    commentDate:{
        type:Date 
    }
})
const comment=mongoose.model("Comment",Comment)
module.exports=comment;
