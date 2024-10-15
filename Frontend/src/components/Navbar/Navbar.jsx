import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-100 shadow-md mb-5 ">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between py-4">
        
        <NavLink to="/" className="text-xl font-semibold text-gray-800">
          School Management System
        </NavLink>

       
        <div className="lg:hidden">
          <button className="text-gray-800 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

      
        <div className="hidden lg:flex lg:items-center lg:space-x-6">
          <NavLink
           
            to=""
            className={({ isActive }) => `text-gray-600 hover:text-gray-800 px-4 py-2 ${isActive ? 'text-blue-600 font-semibold' : ''}`}
          >
            Users
          </NavLink>
          <NavLink
            to=""
            className={({ isActive }) => `text-gray-600 hover:text-gray-800 px-4 py-2 ${isActive ? 'text-blue-600 font-semibold' : ''}`}
          >
            Students
          </NavLink>
          <NavLink
            to=""
            className={({ isActive }) => `text-gray-600 hover:text-gray-800 px-4 py-2 ${isActive ? 'text-blue-600 font-semibold' : ''}`}
          >
            Office Staffs
          </NavLink>
          <NavLink
            to=""
            className={({ isActive }) => `text-gray-600 hover:text-gray-800 px-4 py-2 ${isActive ? 'text-blue-600 font-semibold' : ''}`}
          >
            Librarians
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
