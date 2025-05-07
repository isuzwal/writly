const express=require('express')
const {postcreate,getAllposts,getPostByID,imageupload,userPost}=require("../controllers/postController")
const {verifytoken}=require("../middleware/verifytoken")


const router=express.Router()
router.get("/post",verifytoken,getAllposts);
router.post("/post/create",verifytoken,postcreate);
router.post('/post/upload',verifytoken,imageupload);
router.get("/post/:id",verifytoken,getPostByID);
router.get("/post/user/:username",verifytoken,userPost);

module.exports=router