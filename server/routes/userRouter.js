const express=require('express')
const {profile,register,login,logout,getuserlist,sendVertification,updateprofile,
updatecoverImage,profile_image,bookmarks,getbookmarks
}=require("../controllers/userController")
const {verifytoken}=require("../middleware/verifytoken")
const { coverImage, ProfileImages } = require("../cloudStroage/cloud");
const multer = require('multer');




const router=express.Router()
router.post('/register', register);
router.post('/verification',sendVertification)
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', verifytoken, profile);
router.get('/user',verifytoken,getuserlist);
// update Route
router.put('/profile_image/:id',verifytoken,ProfileImages.single('profileImage'),profile_image)
router.put('/cover_image/:id',verifytoken,coverImage.single('coverImage'),updatecoverImage)
router.put('/user/update-profile/:id',verifytoken,updateprofile)
router.post('/user/my-bookmark',verifytoken,bookmarks)
router.get('/user/get-bookmarks/:username',verifytoken,getbookmarks)
// router.delete('/user/:username',verifytoken,delteaccount)



module.exports=router