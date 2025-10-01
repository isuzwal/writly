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
    follow,
    getnotification,
    unfollow,
    removenotification,
    deletePost
}=require("../controllers/postController")
const {verifytoken}=require("../middleware/verifytoken")
const {uploadimage}=require("../cloudStroage/cloud")

const router = express.Router();


router.post('/post/upload', verifytoken, uploadimage.single('image'), imageupload);
router.post('/post/follow', verifytoken, follow);
router.post('/post/unfollow', verifytoken, unfollow);
router.post("/post/likes", verifytoken, likesnotifcation);
router.post("/post/comment", verifytoken, commentnotification);
router.post("/post/single/commnet", verifytoken, getcomment);
router.get("/post/notification/:username", verifytoken, getnotification);
router.delete("/post/removenotification/:id", verifytoken, removenotification);
router.delete("/post/deletepost/:postId",verifytoken,deletePost)
router.get("/post/user/:username", verifytoken, userPost);

router.get("/post/user-noauth/:username",  userPost);

router.get("/post/:id", verifytoken, getPostByID);

router.get("/home-post", getAllposts);
router.get("/post", verifytoken, getAllposts);
router.post("/post/create", verifytoken, postcreate);


module.exports=router