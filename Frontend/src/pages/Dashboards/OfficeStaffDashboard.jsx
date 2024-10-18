import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import Card from "../../components/cards/Card";
import { FaPeopleRoof } from 'react-icons/fa6';
import { MdPeopleAlt } from 'react-icons/md';
import { useSelector } from "react-redux";



const OfficeStaffDashboard = () =>{
  const { userInfo } = useSelector((state) => state.auth); // Get role from state
  const role = userInfo?.user?.role || "";
  const totalStudents = 120;
  const totalStaffs = 25;
    return(
        <div className="flex">
        <Sidebar role={role}/>
        <div className="flex-1">
        <Header role={role} />
      
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card title="Total Students" number={totalStudents} icon={<FaPeopleRoof/>} />
          <Card title="Total Office Staffs" number={totalStaffs} icon={<MdPeopleAlt/>}/>
         
        </div>
        </div>
      </div>
    )
}
export default OfficeStaffDashboard