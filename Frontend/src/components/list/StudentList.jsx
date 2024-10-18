import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentModal from "../Modal/studentModal";
import { FaEdit, FaTrash } from "react-icons/fa";
import { listStudentsAction, studentDeleteAction } from "../../redux/actions/studentAction";
import ConfirmationModal from "../Modal/ConfirmationModal";
import { toast } from "react-toastify";

const StudentList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
 

  const { students = [], loading, error } = useSelector((state) => state.studentList);
  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      dispatch(listStudentsAction());
    } else {
      console.error("User not authenticated");
    }
  }, [dispatch, userInfo]);

  const handleConfirmationClose = () => {
    setShowModal(false);
    setStudentToDelete(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };
  const handleDelete = (id) => {
    setStudentToDelete(id);
    setShowModal(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true); 
  };

  const handleAddStudent = () => {
    setSelectedStudent(null);
    setIsModalOpen(true); 
  };

  const confirmDelete = async () => {
    try {
      await dispatch(studentDeleteAction(studentToDelete));
      handleConfirmationClose();
     
      setTimeout(() => {
        dispatch(listStudentAction());
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  const isAdmin = userInfo?.user?.role === "admin";
  const isOfficeStaff = userInfo?.user?.role === "officeStaff";
  const isLibrarian = userInfo?.user?.role === "librarian";

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6 m-6">
        <div className="flex justify-between items-center bg-primary text-gray-700 px-4 py-2 rounded-t-lg">
          <h4 className="text-2xl font-bold">Manage <span className="font-bold">Students</span></h4>
          {/* Show "Add New" button only if the user is admin */}
          {isAdmin && (
            <button
              onClick={handleAddStudent}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              Add New
            </button>
          )}
        </div>

        <table className="table-auto w-full mt-4 text-left text-gray-700">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Student ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Gender</th>
              <th className="px-4 py-2">Date of Birth</th>
              <th className="px-4 py-2">Father Name</th>
              <th className="px-4 py-2">Mother Name</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr className="border-b" key={student.ID}>
                <td className="px-4 py-2">{student.ID}</td>
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.gender}</td>
                <td className="px-4 py-2">{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                <td className="px-4 py-2">{student.fatherName}</td>
                <td className="px-4 py-2">{student.motherName}</td>
                <td className="px-4 py-2 flex items-center">
                  <button
                    className="text-blue-500 mr-2 flex items-center"
                    onClick={() => handleViewStudent(student)}
                  >
                    View
                  </button>
                  {/* Only show Edit and Delete buttons for admin */}
                  {isAdmin && (
                    <>
                      <button
                        className="text-yellow-500 mr-2 flex items-center"
                        onClick={() => handleEditStudent(student)}
                      >
                        <FaEdit className="mr-1" />
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => {
                         handleDelete(student._id);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
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
        student={selectedStudent}
        mode={selectedStudent ? (isAdmin ? 'edit' : 'view') : 'add'} // Determine mode based on user role and selected student
      />
      <ConfirmationModal
        show={showModal}
        onHide={handleConfirmationClose}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default StudentList;
