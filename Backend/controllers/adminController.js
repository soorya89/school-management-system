import catchAsync from "../utils/catchAsync";
import User from "../models/UserSchema.js"

export const addUser =catchAsync(async(req,res)=>{
    console.log(req.body)
    try{
        const {name,email,password,role,phone} =req.body
        console.log(req.body)
        const newUser = new User({
            name,
            email,
            password,
            phone,
            role
        })
        await newUser.save()
        return res.status(201).json({
            message:'New user added successfully',
            user:newUser
        })
    }catch(error){
        return res.status(500).json({
            message: "Error adding subscription",
            error: error.message,
          })
    }
})