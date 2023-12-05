const User=require("../model/user.model")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

async function signUp(req,res){
    try{
        const {userName,email,password,phone}=req.body
        const bcryptedpass=await bcrypt.hash(password,10)

        const existingUser= await User.findOne({email})
        if(existingUser){
            return res.status(403).json({message:"User already exist"})
        }
        const newUser= await User.create({userName,email,password:bcryptedpass,phone})
        res.status(201).json(newUser)
    }
    catch(err){
        console.log(err)
    }
}

async function signIn(req,res){
    const {email,password}=req.body

    if(!email|!password){
        return res.status(400).json({message:"Fill all the fields"})
    }

    const user=await User.findOne({email})
    if(!user){
        return res.status(401).json({message:"Invalid Username and password"})
    }

    const validPass=await bcrypt.compare(password,user.password)
    if(!validPass){
        return res.status(401).json({message:"Invalid Username and password"})
    }

    const token=await jwt.sign({id:user._id},"hello",{expiresIn:"1h"})

    res.cookie("token",token,{
        expires:new Date(Date.now() + (10 * 60 * 1000)),
        withCredentials:true,
        httpOnly:false,
    })
    res.cookie('adminRole', user.isAdmin, {
        expires: new Date(Date.now() + 10 * 60 * 1000),
        withCredentials: true,
        httpOnly: false,
      });
    console.log(user)
    res.status(200).json({message:"Signed In successfully"})
}

module.exports={signUp,signIn}