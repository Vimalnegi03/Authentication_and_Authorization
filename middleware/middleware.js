const JWT=require('jsonwebtoken')

const jwtAuth=async(req,res,next)=>{
    const token =(res.cookies && res.cookies.token)||null
    if(!token)
    {
        res.status(400).json({
         message:'token is missing'
        })
    }
    try {
        const payload=JWT.verify(token,process.env.SECRET)
        req.user={
            id:payload.id,email:payload.email
        }
    } catch (error) {
        res.status(400).json({
            message:'error'
           })
    }
}
module.exports=jwtAuth