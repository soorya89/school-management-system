import catchAsync from "../utils/catchAsync.js";
import User from "../models/UserSchema.js"

export const addUser =catchAsync(async(req,res)=>{
   
    const { name, email, password, phone, role } = req.body;
    if (!name || !email || !password || !phone || !role) {
        return res.status(400).json({
            message: "All fields are required.",
        });
    }
    try{
        const {name,email,password,phone,role} =req.body
        console.log(req.body,"///////")
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
            message: "Error adding user",
            error: error.message,
          })
    }
})

export const getAllUsers =catchAsync(async(req,res) => {
  
    
    try{
      
        const users = await User.find({})
      
        res.status(200).json({ success: true, message: "Users found", data: users })
    }catch(error){
        res.status(404).json({success:false,message:"Not found"})
    }
})

export const updateUser =catchAsync(async(req,res)=>{
    const id=req.params.id
    try{
        const updatedUser=await User.findByIdAndUpdate(id,{$set:req.body},{new:true})
        res.status(200).json({success:true , message:"Successfully Updted",data:updatedUser})
    }catch(err){
        res.status(500).json({success:false , message:"Failed to Updte"}) 
    }
})

export const deleteUser = async (req,res)=>{
    const id=req.params.id
    try{
        const deletedUser = await User.findByIdAndDelete(id, {$set:req.body},{new:true})
        console.log(deletedUser,"<>")
        res.status(200).json({success:true , message:"Successfully Deleted"})
    }catch(err){
        res.status(500).json({success:false , message:"Failed to deletete"}) 
    }
}