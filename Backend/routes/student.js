import express from 'express'
import { addStudent ,getAllStudents,updateStudent,deleteStudent} from '../controllers/studentController.js'

const router=express.Router()

router.post('/add-student',addStudent)
router.get("/students",getAllStudents)
router.put('/students/:id',updateStudent)
router.delete('/students/:id',deleteStudent)

export default router