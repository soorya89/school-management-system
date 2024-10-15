import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaArrowLeft } from 'react-icons/fa'
import { BASE_URL } from "../../../config";
import axios from 'axios'
import {toast} from 'react-toastify'


const AddUser = ()=>{
const [user,setUser] =useState({
    name:"",
    email:"",
    password:"",
    phone:"",
    role:""
})

const [error,setError] =useState({
    name:"",
    email:"",
    password:"",
    phone:"",
    role:""
})
const navigate = useNavigate();
const handleChange = (e)=>{
    const {name,value} =e.target
    setUser((prev)=>({...prev,[name]:value}))
    setError((prev)=>({...prev,[name]:value ? "" :`${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
}))
}
const handlePhoneChange = (value, country) => {
    setUser((prev) => ({ ...prev, phone: value }));
    setError((prev) => ({
      ...prev,
      phone: value ? "" : "Phone is required",
    }));
  };

  const handleSubmit = async (e) =>{
    e.preventDefault()

    const {name,email,password,phone,role} =user
    console.log(user)
    const newError={
        name: name ? "" : "Name is required",
        email: email ? "" : "Email is required",
        password: password ? "" : "Password is required",
        phone: phone ? "" : "Phone is required",
        role: role ? "" : "Role is required",
      
    }
    setError(newError)
    if (Object.values(newError).some((error) => error !== "")) {
        return;
      }
      try {
        const result = await axios.post(`${BASE_URL}/admin/add-user`, user);
        if (result.data.status) {
          toast.success("User added successfully");
          navigate("/admin");
        }
      } catch (error) {
        toast.error(error.response?.data.message || "Something went wrong! Try again later.");
      }
      

  }

    return(
 <>
 <div className="container mx-auto mt-3">
      <div className="flex justify-between items-center bg-[#60a5fa] p-4 text-white ">
        <h4>Add <span className="font-bold">User</span></h4>
        <Link to="/admin" className="flex items-center">
          <FaArrowLeft className="mr-1" /> Back to List 
        </Link>
      </div>
      </div>

      <div className="container mx-auto mt-3">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit} >
          <div className="col-span-1">
            <label htmlFor="inputName" className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Name"
              className="border rounded-md p-2 w-full"
              onChange={handleChange}
            />
             {error.name && <p className="text-red-600">{error.name}</p>} 
          </div>

          <div className="col-span-1">
            <label htmlFor="inputEmail" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              autoComplete="off"
              className="border rounded-md p-2 w-full"
              onChange={handleChange}
            />
             {error.email && <p className="text-red-600">{error.email}</p>} 
          </div>

          <div className="col-span-1">
            <label htmlFor="inputPhone" className="block text-sm font-medium mb-1">Phone</label>
            <PhoneInput
              country={"in"}
              value={user.phone}
              onChange={handlePhoneChange}
              inputProps={{ name: "phone", required: true, className: "border rounded-md w-full p-2" }}
            />
             {error.phone && <p className="text-red-600">{error.phone}</p>} 
          </div>

          <div className="col-span-1">
            <label htmlFor="inputAddress" className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              autoComplete="off"
              className="border rounded-md p-2 w-full"
             onChange={handleChange}
            />
            {error.password && <p className="text-red-600">{error.password}</p>}
          </div>

          

          <div className="col-span-1">
            <label htmlFor="department" className="block text-sm font-medium mb-1">Role</label>
            <select
              name="role"
              id="role"

              className="border rounded-md p-2 w-full"
             onChange={handleChange}
            >
              <option value="">Select Role</option>
             
                <option value= 'office staff'>Office Staff</option>
                <option value= 'librarian'>Librarian</option>
            
            </select>
            {error.role && <p className="text-red-600">{error.role}</p>}
          </div>

          

          <div className="col-span-1 flex justify-end mt-3">
            <button type="submit" className="bg-[#60a5fa] text-white rounded-md px-4 py-2 hover:bg-blue-600">
              ADD NEW USER
            </button>
          </div>
        </form>
      </div>
    </>
    )
}
export default AddUser