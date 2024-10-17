import express from 'express'
import { addFeeHistory,getAllFeeHistory,updateFeeHistory,deleteFeeHistory } from '../controllers/feeController.js'

const router=express.Router()

router.post("/add-history",addFeeHistory)
router.get("/history",getAllFeeHistory)
router.put('/history/:id',updateFeeHistory)
router.delete('/history/:id',deleteFeeHistory)

export default router