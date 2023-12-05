const mongoose=require('mongoose')
const candidateSchema=new mongoose.Schema({
    candidateName:{
        type:String,
        required:true
    },
    votes:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:'User'
    }
},{timestamps:true})

module.exports=mongoose.model('Candidate',candidateSchema)