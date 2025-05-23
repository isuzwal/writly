const express=require('express')
const {
    postcreate,
    getAllposts,
    getPostByID,
    imageupload,
    userPost,
    likesnotifcation,
    commentnotification,
    getcomment,
    getnotification
}=require("../controllers/postController")
const {verifytoken}=require("../middleware/verifytoken")
const uploadimage=require("../cloudStroage/cloud")

const router=express.Router()
router.get("/post",verifytoken,getAllposts);
router.post("/post/create",verifytoken,postcreate);

// fgor notification
router.get("/post/notification/:username",verifytoken,getnotification)
router.get("/post/user/:username",verifytoken,userPost);

// for the post vy ID 
router.get("/post/:id",verifytoken,getPostByID);

// for action on the post 
router.post('/post/upload', verifytoken, uploadimage.single('image'), imageupload);
router.post("/post/likes",verifytoken,likesnotifcation)
router.post("/post/comment",verifytoken,commentnotification)
router.post("/post/single/commnet",verifytoken,getcomment)
module.exports=router