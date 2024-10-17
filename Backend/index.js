import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import adminRoute from './routes/admin.js'
import studentRoute from './routes/student.js'
import libraryRoute from './routes/library.js'
import feesRoute from './routes/fees.js'


dotenv.config()

const app=express()
const port=process.env.PORT  || 8000

const corsOptions={
    credentials: true, 
    origin:process.env.REACT_APP_FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    
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
app.use('/student',studentRoute) 
app.use('/library',libraryRoute)
app.use('/fees',feesRoute) 

app.listen(port,()=>{
    connectDB()
    console.log("Server is running on port" +  port)
})