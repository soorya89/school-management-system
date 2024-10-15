import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import adminRoute from './routes/admin.js'


dotenv.config()

const app=express()
const port=process.env.PORT  || 8000

const corsOptions={
    origin:true,
}

app.get('/',(req,res)=>{
    res.send('Api is working')
})

mongoose.set('strictQuery',false)
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB database is connected");
    }catch(err){
        
        console.log("MongoDB database is failed to connect");
    }
}

app.use(express.json())
app.use(cors(corsOptions)) 
app.use('/auth',authRoute)
app.use('/admin',adminRoute) 

app.listen(port,()=>{
    connectDB()
    console.log("Server is running on port" +  port)
})