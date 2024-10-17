import express from 'express'
import { addLibraryHistory,updateLibraryHistory,getAllLIbraryHistory,deleteLibraryHistory } from '../controllers/libraryController.js'

const router=express.Router()

router.post("/add-history",addLibraryHistory)
router.get("/history",getAllLIbraryHistory)
router.put('/history/:id',updateLibraryHistory)
router.delete('/history/:id',deleteLibraryHistory)

export default router