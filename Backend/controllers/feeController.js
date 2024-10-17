import catchAsync from "../utils/catchAsync.js";
import FeesHistory from "../models/FeesHistorySchema.js";

export const addFeeHistory = async (req, res) => {
    const { studentID, feeType, amount, paymentDate, status } = req.body;
  
    try {
     
      if (!studentID || !feeType || !amount) {
        return res.status(400).json({ message: 'Please provide all required fields' });
      }
  
      
      const newFeeHistory = new FeesHistory({
        studentID,
        feeType,
        amount,
        paymentDate, 
        status,  
      });
  
      const savedFeeHistory = await newFeeHistory.save();
  
      res.status(201).json({
        success: true,
        message: 'Fee history added successfully',
        data: savedFeeHistory,
      });
  
    } catch (error) {
      console.error('Error adding fee history:', error.message);
      res.status(500).json({
        success: false,
        message: 'Failed to add fee history',
        error: error.message,
      });
    }
  };

  export const getAllFeeHistory =catchAsync(async(req,res) => {
  
    
    try{
      
        const feeHistory = await FeesHistory.find({})
       
      
        res.status(200).json({ success: true, message: "Users found", data: feeHistory })
    }catch(error){
        res.status(404).json({success:false,message:"Not found"})
    }
})

export const updateFeeHistory =catchAsync(async(req,res)=>{
  const id=req.params.id
  try{
      const updatedFeeHistory=await FeesHistory.findByIdAndUpdate(id,{$set:req.body},{new:true})
      res.status(200).json({success:true , message:"Successfully Updted",data:updatedFeeHistory})
  }catch(err){
      res.status(500).json({success:false , message:"Failed to Updte"}) 
  }
})

export const deleteFeeHistory = async (req,res)=>{
  const id=req.params.id
  try{
      const deletedLibraryHistory = await FeesHistory.findByIdAndDelete(id, {$set:req.body},{new:true})
      
      res.status(200).json({success:true , message:"Successfully Deleted"})
  }catch(err){
      res.status(500).json({success:false , message:"Failed to deletete"}) 
  }
}