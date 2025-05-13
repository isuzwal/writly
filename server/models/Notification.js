const mongoose=require("mongoose");

const NotificationSchema=new  mongoose.Schema({
    notificationtype:{
      type:String,
      enum:["follow","like","comment"],
      required:true
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    comments:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comment",
        // required:true,
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    notificationtime:{
     type:Date,
     default:Date.now
    }
})
const notifiaction=mongoose.model("Notifaction",NotificationSchema)
module.exports=notifiaction;