const express= require('express')
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
const cors=require('cors')
require('dotenv').config()

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

mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log("Connected to db")
}).catch((err)=>{console.log(err)})

app.listen(process.env.PORT,()=>{console.log(`server runnning on http://localhost:${process.env.PORT}`)})
