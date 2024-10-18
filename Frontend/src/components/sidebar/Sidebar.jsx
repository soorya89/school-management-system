import React from 'react';
import { MdDashboard, MdPeopleAlt, MdLogout } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import { FaPeopleRoof, FaMoneyCheckDollar } from "react-icons/fa6";
import { NavLink,  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../../redux/actions/authAction'; 

const Sidebar = () => {
  
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 
  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth
  console.log(userInfo,"user.....................info")
  const role = userInfo?.user?.role;
  
  const officeStaffMenuItems = [
    { label: "Students", icon: <FaPeopleRoof />, link: "/staff/students" },
    { label: "Fees History", icon: <FaMoneyCheckDollar />, link: "/staff/fees" },
    { label: "Library History", icon: <IoLibrary />, link: "/staff/library" },
    { label: "Logout", icon: <MdLogout />, link: "/" },
  ];


  const adminMenuItems = [
    { label: "Dashboard", icon: <MdDashboard />, link: "/admin/dashboard" },
    { label: "Users", icon: <MdPeopleAlt />, link: "/admin/users" },
    { label: "Students", icon: <FaPeopleRoof />, link: "/admin/students" },
    { label: "Library History", icon: <IoLibrary />, link: "/admin/library" },
    { label: "Fees History", icon: <FaMoneyCheckDollar />, link: "/admin/fees" },
    { label: "Logout", icon: <MdLogout />, link: "/" },
  ];
  const librarianMenuItems = [
    { label: "Students", icon: <FaPeopleRoof />, link: "/librarian/students" },
    { label: "Library History", icon: <IoLibrary />, link: "/librarian/library" },
    { label: "Fees History", icon: <FaMoneyCheckDollar />, link: "/librarian/fees" },
    { label: "Logout", icon: <MdLogout />, link: "/" },
];

  
let menuItems;
if (role === "admin") {
  menuItems = adminMenuItems;
} else if (role === "officeStaff") {
  menuItems = officeStaffMenuItems;
} else if (role === "librarian") {
  menuItems = librarianMenuItems;
} else {
  menuItems = [
    { label: "Access Denied", icon: null, link: "#" }
  ]; // Default case to indicate an issue
  console.warn("Unknown role detected:", role); // Debugging lin
}

 
  const handleLogout = () => {
    const isStaff = userInfo?.role === 'officeStaff'; 
    console.log(isStaff,"isStaff")
    dispatch(LOGOUT(navigate, isStaff)); 
  };

  return (
    <div className="bg-gray-700 h-screen w-72 p-5 text-ternaryColor pt-8">
      <h4 className="text-white text-xl font-bold mb-4">School Management System</h4>
      <ul className="pt-2">
  {menuItems.map((item, index) => (
    <li
      key={index}
      className="text-gray-300 text-sm flex items-center gap-x-4 p-5 hover:bg-ternaryColor/50 rounded-md mt-2"
    >
      <NavLink
        to={item.label === "Logout" ? "#" : item.link} // Prevent navigation on logout
        onClick={item.label === "Logout" ? handleLogout : null}
        className={({ isActive }) =>
          `text-gray-300 text-sm flex items-center gap-x-4 p-2 rounded-md hover:bg-gray-500 transition-colors w-72 duration-200 ${
            isActive ? "bg-gray-500 w-72 text-white" : ""
          }`
        }
      >
        <span className="text-2xl block float-left">{item.icon}</span>
        <span className="text-base font-medium flex-1">{item.label}</span>
      </NavLink>
    </li>
  ))}
</ul>

    </div>
  );
};

export default Sidebar;
