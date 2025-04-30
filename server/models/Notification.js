const mongoose=require("mongoose");

const NotificationSchema=new  mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    targetUser:{
        type:mongoose.Scheam.Types.ObjectId,
        ref:"User"
    },
    post:{
        type:mongoose.Scheam.Type.ObjectId,
        ref:"Post"
    },
    notificationtype:{
      type:String,
      enum:["follow","like","comment"]
    },
    notificationtime:{
     type:Date,
     default:Date.now
    }
})
const notifiaction=mongoose.model("Notifaction",NotificationSchema)
module.exports=notifiaction;