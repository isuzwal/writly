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
}=require("../controllers/postController")
const {verifytoken}=require("../middleware/verifytoken")
const uploadimage=require("../cloudStroage/cloud")

const router=express.Router()
router.get("/post",verifytoken,getAllposts);
router.post("/post/create",verifytoken,postcreate);
router.get("/post/:id",verifytoken,getPostByID);
router.get("/post/user/:username",verifytoken,userPost);
router.post('/post/upload', verifytoken, uploadimage.single('image'), imageupload);
router.post("/post/likes",verifytoken,likesnotifcation)
router.post("/post/comment",verifytoken,commentnotification)
router.post("/post/single/commnet",verifytoken,getcomment)
module.exports=router