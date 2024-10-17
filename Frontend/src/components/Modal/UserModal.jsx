import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {addNewUserAction,userUpdateAction} from '../../redux/actions/userAction'


const UserModal = ({ isOpen, onClose, onSubmit,onUpdateUser, users }) => {
  const dispatch = useDispatch()
    console.log("hello")
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      password: "",
      role: ""
    });
  

    useEffect(() => {
      if (isOpen && users) {
        setFormData({
          name: users.name,
          email: users.email,
          phone: users.phone,
          password: "",
          role: users.role
        });
      } else {
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          role: ""
        });
      }
    }, [isOpen, users]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    };

    const handleSubmit = async(e) => {
      e.preventDefault();
     
     if(users){
     const updatedUser= await dispatch(userUpdateAction(users._id,formData))
     onUpdateUser(updatedUser);
     }else{
      const newUser= await dispatch(addNewUserAction(formData))
      onSubmit(newUser)
     }
      
      onClose();
    };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-md p-6 w-96">
          <h2 className="text-xl font-bold mb-4">{users ? "Edit Employee" : "Add Employee"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
                required
              />
            </div>
            {!users && (
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="border rounded-lg p-2 w-full"
                                    required
                                />
                            </div>
                        )}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 mb-1">Role</label>
            <select
               name="role"
                onChange={handleChange}
                value={formData.role}
                className="border rounded-lg p-2 w-full"
                required
              >
                <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="officeStaff">Office Staff</option>
        <option value="librarian">Librarian</option>
            
              </select>

           
            </div>
         
          
            <div className="flex justify-end">
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                {users ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default UserModal;
