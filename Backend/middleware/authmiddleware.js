const jwt = require("jsonwebtoken")

async function verifyToken(req,res,next){
    const token=req.cookies.token
    if(!token){
        return res.json({status:false})
    }
    jwt.verify(token,"hello",async(err,data)=>{
        if(err){
            return res.json({status:false})
        }else{
            req.userID=data.id
            next()
        }
    })
}

module.exports={verifyToken}