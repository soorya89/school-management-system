import express from 'express'
import { addUser,getAllUsers,updateUser,deleteUser } from '../controllers/adminController.js'

const router=express.Router()

router.post("/add-user",addUser)
router.get("/users",getAllUsers)
router.put('/users/:id',updateUser)
router.delete('/users/:id',deleteUser)

export default router