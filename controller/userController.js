const User =require('../models/userModal.js')
const emailvalidator=require('email-validator')
const bcrypt=require('bcrypt')
exports.Home=async(req,res)=>{
    res.send("chloo ghar")
}
exports.signup=async(req,res)=>{
    const {name,email,password,confirmPassword}=req.body;
    if(!name||!password||!email||!confirmPassword)
    {
       return  res.status(400).json({
            message:"please fill all the details",
            success:"false"
        })
    }
 const validemail=emailvalidator.validate(email)
 if(!validemail)
 {
   return  res.status(400).json({
        message:"please enter a valid mail",
        success:"false"
    })
 }
 if(password!=confirmPassword)
 {
  return res.status(400).json({
     message:"your password did not  matched"
  })
 }
 try {
    const user=new User(req.body)
    const userinfo=await user.save()
    return res.status(200).json({
        data:user,
        userinfo,
        success:true,
        message:"registered succesfully"
    })
 } 
 catch (error) {
    if(error.code===11000)
    {
        return res.status(400).json({
            message:"mail already registered"})
    }
    return res.status(400).json({
        message:error
     })
 }
}

exports.signin=async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email||!password)
    {
      return  res.status(400).json({
            success:false,
            message:"All fields are necessary"
        })
    } 
    try {
        const user= await User.findOne({email}).select('+password')
        if(!user|| await bcrypt.compare(user.password,password))
        {
         return  res.status(400).json({
                message:"Invalid credentials",
                success:false
            })
        }
        const token =user.jwtToken();
        user.password=undefined
        const cookieOption={
            maxAge:24*60*60*1000,
            httpOnly:true
        }
    
        res.cookie("token",token,cookieOption)
        res.status(200).json({
            success:true,
            message:"login successfull",
            data:user
        })
    } 
    catch (error) {
        res.status(400).json({
            success:false,
            message:error.message,
           
        })
    }
}
exports.getUser=async(req,res,next)=>{
    const user=req.user.id
    try {
        const user=await User.findById(user)
        res.status(200).json({
            success:true,
            message:"details successfully accessed",
            data:user
        })
    } 
    catch (error) {
        res.status(400).json({
            success:false,
            message:"request failed",
           
        })
    }
}

exports.logout=(req,res,next)=>{
    try {
        const cookieOption={
            expires:new Date(),
            httpOnly:true
        }
        res.cookie('token',null,cookieOption)
        res.status(200).json({
            success:false,
            message:"log out successfully",
           
        })
    } 
    catch (error) {
        res.status(400).json({
            success:false,
            message:"request failed",
           
        })
    }
}
