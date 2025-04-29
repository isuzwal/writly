const express=require('express')
const {postcreate,getAllposts,getPostByID,imageupload,userPost}=require("../controllers/postController")
const {verifytoken}=require("../middleware/verifytoken")


const router=express.Router()
router.post("/post",verifytoken,postcreate);
router.post('/post/upload',verifytoken,imageupload);
router.get("/post",verifytoken,getAllposts);
router.get("/post/id/:id",verifytoken,getPostByID);
router.get("/post/user/:username",verifytoken,userPost);

module.exports=router