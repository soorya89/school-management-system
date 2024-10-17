import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa"
import UserModal from "../Modal/UserModal";
import {BASE_URL} from '../../../config'
import { listUsersAction,userDeleteAction } from "../../redux/actions/userAction";
import ConfirmationModal from '../../components/Modal/ConfirmationModal'
import { toast } from "react-toastify";



const UserList=()=> {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user,setUser] =useState([])
  const [selectedUsers,setSelectedUsers]=useState(null)
  const [userToDelete, setUserToDelete] = useState(null)
  const dispatch=useDispatch()
  const {users=[],loading,error} =useSelector((state)=>state.userList)
  const auth=useSelector((state)=>state.auth)


  const {userInfo}=auth
  const userDelete=useSelector((state)=>state.userDelete)
  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedUsers(null)

  };
  useEffect(()=>{
    if(userInfo){
      
      dispatch(listUsersAction())
    }else{
      console.error('user not authenticated')
    }
  },[dispatch,userInfo])

  const handleConfirmationClose = () => {
    setShowModal(false);
    setUserToDelete(null);
};
  
  const handleAddUser = async (newUser) => {
    try {
        const result = await axios.post(`${BASE_URL}/admin/add-user`, newUser);
        if (result.data.success) { 
            toast.success(result.data.message);
            dispatch(listUsersAction()); 
        }
    } catch (error) {
        toast.error('Error adding user');
        console.error(error);
    }
}
const handleEditUser = (user) => {
  setSelectedUsers(user); 
  setIsModalOpen(true);
}
const handleUpdateUser = () => {
  toast.success("User updated successfully!")
  setTimeout(() => {
    dispatch(listUsersAction()); 
  },1000)
};
const confirmDelete = async () => {
  try{
    await dispatch(userDeleteAction(userToDelete))
    handleConfirmationClose()
    setTimeout(() => {
      dispatch(listUsersAction())
    }, 1000); 
  }catch(error){
    console.error(error)
  }
};
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6 m-6">
        <div className="flex justify-between items-center bg-primary text-gray-700 px-4 py-2 rounded-t-lg">
          <h4 className="text-2xl font-bold">
            Manage <span className="font-bold">Users</span>
          </h4>
          <button
            onClick={() => {
              setSelectedUsers(null);
              setIsModalOpen(true);
              console.log("Add New button clicked")
            }}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            Add New
          </button>
        </div>

        <table className="table-auto w-full mt-4 text-left text-gray-700">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
          {users && users.map((user) => (

           
              <tr key={user._id}  className="border-b">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                
                <td className="px-4 py-2">
                {user.phone}
                </td>
                <td className="px-4 py-2">
                {user.role}
                </td>
              
                <td className="px-4 py-2 flex items-center">
                  <Link to='' className="text-yellow-500 mr-2" onClick={() => handleEditUser(user)}>
                   <FaEdit  />
                  </Link>
                  <button
                    className="text-red-500 ps-2"
                   onClick={()=>{setUserToDelete(user);
                               setShowModal(true);}
                   }      
                  >
                   <FaTrash />
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
      <UserModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
        onSubmit={handleAddUser}
        users={selectedUsers}
        onUpdateUser={handleUpdateUser} 
      />
       <ConfirmationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={confirmDelete}
      /> 
    </>
  )
}

export default UserList;
