
import { MdDashboard,MdPeopleAlt,MdLogout  } from "react-icons/md";
import {IoLibrary  } from "react-icons/io5";
import { FaPeopleRoof ,FaMoneyCheckDollar} from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Sidebar =()=>{

    const menuItems =[
        { label:"Dashboard",icon:<MdDashboard/>,link:"/admin/dashboard" },
        { label:"Users",icon:<MdPeopleAlt/>,link:"/admin/users" },
        { label:"Students",icon:<FaPeopleRoof/>,link:"/admin/students" },
        { label:"LIbrary History",icon:<IoLibrary/>,link:"/admin/library" },
        { label:"Fees History",icon:<FaMoneyCheckDollar/>,link:"/admin/fees" },
        { label:"Logout",icon:<MdLogout/>,link:"/" },
        

    ]
    return(
        <div className="bg-gray-700 h-screen w-72 p-5 text-ternaryColor pt-8">
             <h4 className="text-white text-xl font-bold mb-4">
        School Management System
      </h4>
        <ul className="pt-2">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="text-gray-300 text-sm flex items-center gap-x-4 p-5 hover:bg-ternaryColor/50 rounded-md mt-2 "
            >
             <NavLink
              to={item.link}
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
    )
}
export default Sidebar