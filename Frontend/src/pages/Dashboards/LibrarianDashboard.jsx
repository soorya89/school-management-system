import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import Card from "../../components/cards/Card";
import { useSelector } from "react-redux";


const LibrarianDashboard = () =>{
    const { userInfo } = useSelector((state) => state.auth); 
    const role = userInfo?.user?.role || "";
    const totalStudents = 120
    const totalLibrarians = 10;

    return(
        <div className="flex">
      <Sidebar />
      <div className="flex-1">
      <Header role={role} />

        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card title="Total Students" number={totalStudents} icon={<FaPeopleRoof/>} />
          <Card title="Total Librarians" number={totalLibrarians} icon={<IoLibrary/>} />
        </div>
      </div>
    </div>
    )

}

export default LibrarianDashboard