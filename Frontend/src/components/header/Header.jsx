import React, { useState,useEffect } from 'react';

const Header =()=>{
  const [role,setRole]=useState('')
  useEffect(()=>{
    const userInfo=JSON.parse(sessionStorage.getItem('userInfo'))
    console.log(userInfo)
    if(userInfo && userInfo.user && userInfo.user.role){
      setRole(userInfo.user.role)
    }
  })
    return(
        <div className="bg-gray-700 shadow-lg mr-[8px] h-15">
        <header className="w-screen max-w-6xl mx-5 flex justify-between items-center px-4 py-2 ">
          <h1 className=" text-xl font-semibold text-white">
          {role === 'admin' ? 'Admin Dashboard' :
           role === 'officeStaff' ? 'Staff Dashboard' :
           role === 'librarian' ? 'Librarian Dashboard' : null }
            </h1>
        </header>
      </div>
    )
}
export default Header