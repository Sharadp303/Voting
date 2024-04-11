const Candidate=require('../model/candidate.model')
const User=require('../model/user.model')

async function addC(req,res){
    try{
        const {candidateName}=req.body
        
        
        if(!candidateName){
            return res.status(204).json({message:"Candidate name required"})
        }

        const existingCan= await Candidate.findOne({candidateName})
        if(existingCan){
            return res.status(403).json({message:"Candidate already exist"})
        }

        const newCan= await Candidate.create({candidateName})
        res.status(201).json(newCan)
    }
    catch(err){
        console.log(err)
    }
}

async function getC(req,res){
    try{
        const result=await Candidate.find()
       res.status(200).json(result)
    }
    catch(err){
        console.log(err)
    }
}

async function getCanVotes(req,res){
    const cName=req.params.canName;
    console.log(cName)

    const result=await Candidate.findOne({candidateName:cName})
    res.status(200).json(result)
}

async function delC(req,res){
    const {candidateName}=req.body

    const result=await Candidate.deleteOne({candidateName})
    res.status(200).json(result)
}

async function voteC(req,res){
    try{
        const userId=req.userID;
        const canId=req.params.canId;

        const user=await User.findById(userId)
        console.log(user)
        if(user.voted==true){
            return res.status(200).json("Already voted")
        }
        user.voted=true;
        await user.save();

        const candidate= await Candidate.findById(canId)
        candidate.votes.push(user._id)
        await candidate.save();
        console.log(candidate)
        res.status(200).json("Successfully voted")
    }
    catch(err){
        console.log(err)
    }
}


module.exports={addC,delC,getC,voteC,getCanVotes}