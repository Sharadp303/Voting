const express= require('express')
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
const cors=require('cors')



const app=express()

app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","PUT","DELETE"],
    credentials: true,
}))

app.use(express.json())
require('./routes/auth.routes')(app)
require('./routes/candidate.routes')(app)

mongoose.connect('mongodb+srv://sharad:sharad@cluster0.tpbktth.mongodb.net/').then(()=>{
    console.log("Connected to db")
}).catch((err)=>{console.log(err)})

app.listen(5555,()=>{console.log("server runnning on http://localhost:5555")})
