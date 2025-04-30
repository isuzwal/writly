const mongoose=require("mongoose")

//->Schema part
const UserScheam=new mongoose.Schema({
    username:{
         type:String,
         required: true,
         unique: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          "Please enter a valid email address."]
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:[8,"Paaword must be at  least 8 characters long"],
        match:[ 
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
            "Password must have Upper letter ,number & one special character "
        ]
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    verificationCode:{
    type:String,
    default:null 
   },
    bio:{
        type:String,
        default:"I am Lazy",
    },
    profileImage: {
            type: String,  
            default:"https://i.pinimg.com/736x/17/df/a4/17dfa4b53172d9742b85bc699c5aeb1d.jpg"
    },
    coverImage: {
            type: String, 
            default:"https://i.pinimg.com/736x/a5/42/11/a5421117741b0f51f4096f52fd09877a.jpg", 
    },
    links:[
        {
         platform:{
          type:String,
         },
         urls:{
            type:String,
         }
    }],
    follower:[{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User",
    }],
    following:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
    }],
    post:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:"Post",
        }],
    bookmarks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
        }],
    likedpost:[
            {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
            }
        ],
        lasteSeen:{
            type:Date,
            dafault:Date.now
        }
},{timestamps:true})

const Userscheam=mongoose.model("User",UserScheam)
module.exports=Userscheam;