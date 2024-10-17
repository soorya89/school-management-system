import catchAsync from "../utils/catchAsync.js";
import LibraryHistory from '../models/LibraryHistorySchema.js'
import Student from '../models/StudentSchema.js'

export const addLibraryHistory = async (req, res) => {
  
    const { studentID, bookId, borrowedDate, returnDate, status } = req.body;
    if (!studentID || !bookId || !borrowedDate || !returnDate || !status) {
      return res.status(400).json({
          message: 'All fields are required.',
      });
  }
  
    try {
      const libraryHistory = new LibraryHistory({
        studentID,
        bookId,
        borrowedDate,
        returnDate,
        status,
      });
  
    console.log(libraryHistory,"history")
      await libraryHistory.save();
  
    
      res.status(201).json({
        message: 'Library history added successfully',
        libraryHistory,
      });
    } catch (error) {
      console.error('Error adding library history:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const getAllLIbraryHistory =catchAsync(async(req,res) => {
  
    
    try{
      
        const libraryHistory = await LibraryHistory.find({})
       
      
        res.status(200).json({ success: true, message: "Users found", data: libraryHistory })
    }catch(error){
        res.status(404).json({success:false,message:"Not found"})
    }
})

export const updateLibraryHistory =catchAsync(async(req,res)=>{
  const id=req.params.id
  try{
      const updatedLibraryHistory=await LibraryHistory.findByIdAndUpdate(id,{$set:req.body},{new:true})
      res.status(200).json({success:true , message:"Successfully Updted",data:updatedLibraryHistory})
  }catch(err){
      res.status(500).json({success:false , message:"Failed to Updte"}) 
  }
})

export const deleteLibraryHistory = async (req,res)=>{
  const id=req.params.id
  try{
      const deletedLibraryHistory = await LibraryHistory.findByIdAndDelete(id, {$set:req.body},{new:true})
      
      res.status(200).json({success:true , message:"Successfully Deleted"})
  }catch(err){
      res.status(500).json({success:false , message:"Failed to deletete"}) 
  }
}