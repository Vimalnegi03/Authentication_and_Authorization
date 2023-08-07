const mongoose=require('mongoose')
const {Schema}=mongoose
const JWT=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        minLength:[3],
        maxLength:[50]

    },
    email:{
   type:String,
   required:[true,"please enter your mail"],
   minLength:[3],
   maxLength:[50]

    },
    password:{
        type:String,
        select:false
    },
    confirmPassword:{
        type:String,
        select:false
    },
    forgetPasswordToken:{
        type: String

    },
    forgetPasswordExpiryDate:{
        type: Date
    }
},{
        timestamps:true
    }
) 

userSchema.pre('save',async function(next){
    if(!this.isModified('password'))
    return next()
    this.password=await bcrypt.hash(this.password,10)
    return next();
  })
userSchema.methods={
    jwtToken(){
        return JWT.sign({id:this._id,email:this.email},
            process.env.SECRET,
            {expiresIn:'24h'})
    }
}
module.exports=mongoose.model("User",userSchema)

