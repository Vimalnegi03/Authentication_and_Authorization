require('dotenv').config()
const express=require('express')
const routes=require('./Routes/routes.js')
const cookieParser=require('cookie-parser')
const app=express();
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use('/',routes)
  

module.exports=app;