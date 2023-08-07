const express=require('express')
const jwtAuth= require('../middleware/middleware.js');
const connectToDb=require('../config/config.js')
const {Home,signup, signin,getUser,logout}=require('../controller/userController.js')

const router =express.Router();
connectToDb()
router.get('/Home',Home)
router.post('/signup',signup)
router.post('/signin',signin)
router.get('/getuser',jwtAuth,getUser)
router.get('/logout',jwtAuth,logout)

module.exports=router;