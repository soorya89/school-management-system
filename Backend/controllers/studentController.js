import catchAsync from "../utils/catchAsync.js";
import Student from '../models/StudentSchema.js'


export const addStudent = catchAsync(async (req, res) => {
  console.log("Request Body:", req.body);
  try {
      const {
          ID,
          name,
          dateOfBirth,
          gender,
          address,
          contact,
          fatherName,
          motherName,
          guardian
      } = req.body;

      if (!ID || !name || !dateOfBirth || !gender || !address || !contact || !fatherName || !motherName || !guardian) {
          return res.status(400).json({
              message: 'All fields are required.',
          });
      }

      const newStudent = new Student({
          ID,
          name,
          dateOfBirth,
          gender,
          address,
          contact,
          fatherName,
          motherName,
          guardian
      });

      console.log("New Student Object:", newStudent);

      await newStudent.save().catch(err => {
          console.error('Error during save:', err);
          return res.status(500).json({
              message: 'Error adding student',
              error: err.message,
          });
      });

      return res.status(201).json({
          message: 'New student added successfully',
          student: newStudent
      });
  } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({
          message: 'Error adding student',
          error: error.message,
      });
  }
});


  export const getAllStudents =catchAsync(async(req,res) => {
  
    
    try{
      
        const students = await Student.find({})
      
        res.status(200).json({ success: true, message: "Users found", data: students })
    }catch(error){
        res.status(404).json({success:false,message:"Not found"})
    }
})

export const updateStudent =catchAsync(async(req,res)=>{
  const id=req.params.id
  try{
      const updatedStudent=await Student.findByIdAndUpdate(id,{$set:req.body},{new:true})
      res.status(200).json({success:true , message:"Successfully Updted",data:updatedStudent})
  }catch(err){
      res.status(500).json({success:false , message:"Failed to Updte"}) 
  }
})

export const deleteStudent = async (req,res)=>{
  const id=req.params.id
  try{
      const deletedStudent = await Student.findByIdAndDelete(id, {$set:req.body},{new:true})
      
      res.status(200).json({success:true , message:"Successfully Deleted"})
  }catch(err){
      res.status(500).json({success:false , message:"Failed to deletete"}) 
  }
}