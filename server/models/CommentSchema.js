const mongoose=require("mongoose")

const CommentSchema=new mongoose.Schema({
    posts:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    text:{
        type:String,
        required:true,
        trim:true,
    },
    commentDate:{
        teype:Date 
    }
})
const comment=mongoose.model("Comment",CommentSchema)
module.exports=comment;
