import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentModal from "../Modal/studentModal";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { listStudentsAction,studentDeleteAction } from "../../redux/actions/studentAction";
import ConfirmationModal from "../Modal/ConfirmationModal";
import { toast } from "react-toastify"


const StudentList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null)
  const dispatch=useDispatch()
  
  
  const{students=[],loading,error} =useSelector((state)=>state.studentList)
  console.log(students)
  const auth=useSelector((state)=>state.auth)
 const {userInfo} =auth

 const studentDelete=useSelector((state)=>state.studentDelete)

 useEffect(()=>{
  if(userInfo){
    
    dispatch(listStudentsAction())
  }else{
    console.error('user not authenticated')
  }
},[dispatch,userInfo])

const handleConfirmationClose = () => {
  setShowModal(false);
  setStudentToDelete(null);
};

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
    setIsViewing(false);
  };
  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
    setIsViewing(false);
  };
  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
    setIsViewing(true);
  };
  const handleAddStudent = () => {
    setSelectedStudent(null);
    setIsModalOpen(true);
    setIsViewing(false);
  };
  const handleUpdateStudent = () => {
    toast.success("Studentupdated successfully!")
    setTimeout(() => {
      dispatch(listStudentsAction()); 
    },1000)
  };
  const confirmDelete = async () => {
    try{
      await dispatch(studentDeleteAction(studentToDelete._id))
      handleConfirmationClose()
      setTimeout(() => {
        dispatch(listStudentsAction())
      },1000); 
    }catch(error){
      console.error(error)
    }
  };
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6 m-6">
        <div className="flex justify-between items-center bg-primary text-gray-700 px-4 py-2 rounded-t-lg">
          <h4 className="text-2xl font-bold">
            Manage <span className="font-bold">Students</span>
          </h4>
          <button
            onClick={() => {
              setSelectedStudent(null);
              setIsModalOpen(true);
            }}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            Add New
          </button>
        </div>
      
        <table className="table-auto w-full mt-4 text-left text-gray-700">
          <thead className="bg-gray-200">
            <tr>
            <th className="px-4 py-2">StudentId</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Gender</th>

              <th className="px-4 py-2">Date of Birth</th>
              <th className="px-4 py-2">Father Name</th>
              <th className="px-4 py-2">Mother Name</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {students && students.map((student) => ( 

            <tr className="border-b">
              <td className="px-4 py-2">{student.ID}</td>
              <td className="px-4 py-2">{student.name}</td>
              <td className="px-4 py-2">{student.gender}</td>

              <td className="px-4 py-2">
  {new Date(student.dateOfBirth).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}
</td>
              <td className="px-4 py-2">{student.fatherName}</td>
              <td className="px-4 py-2">{student.motherName}</td>

              <td className="px-4 py-2 flex items-center">
                <button
                  className="text-blue-500 mr-2 flex items-center"
                  onClick={() => handleViewStudent(student)}
                >
                  View
                </button>
                <button
                  className="text-yellow-500 mr-2 flex items-center"
                  onClick={() => handleEditStudent(student)}
                >
                  <FaEdit className="mr-1" />
                </button>
                <button className="text-red-500 ps-2" 
                onClick={()=>{setStudentToDelete(student);
                               setShowModal(true);}
                   } >
                  <FaTrash />
                </button>
              </td>
            </tr>
             ))}
          </tbody>
        </table>
      </div>
      <StudentModal 
      isOpen={isModalOpen} 
      onClose={handleModalClose}
      onSubmit={handleAddStudent}
      mode={isViewing ? "view" : selectedStudent ? "edit" : "add"}
      onUpdateStudent={handleUpdateStudent}
      student={selectedStudent}
       />
     <ConfirmationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};
export default StudentList;
