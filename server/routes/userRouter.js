const express=require('express')
const {profile,register,login,logout,getuserlist}=require("../controllers/userController")
const {verifytoken}=require("../middleware/verifytoken")

const router=express.Router()
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', verifytoken, profile);
router.get('/user',verifytoken,getuserlist);

module.exports=router