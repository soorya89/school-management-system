import bcrypt from 'bcryptjs';
import CatchAsync from '../utils/catchAsync.js'
import User from '../models/UserSchema.js'
import generateToken from '../sevices/generateToken.js'


export const Login= CatchAsync (async(req,res)=>{
    console.log(req.body,"request")
    const {email,password} =req.body

    try{
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please provide both email and password" });
        }
        const user =await User.findOne({email})
        console.log(user,"user")

        if(!user){
            return res.status(404).json({success:false,message:"user not found"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success:false,message: "Invalid credentials" });
    }

    const token=generateToken({id: user._id, role: user.role})
    res.status(200).json({
        success:true,
        message:"Logged in successfully..",
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            
        }
       
    })
    }catch(error){
        console.error(error)
        res.status(500).json({success:false,message:'server error'})
    }
})




