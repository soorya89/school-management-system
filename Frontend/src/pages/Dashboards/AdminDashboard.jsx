import Sidebar from '../../components/sidebar/Sidebar'
import Card from '../../components/cards/Card';
import { MdPeopleAlt } from 'react-icons/md';
import { IoLibrary } from 'react-icons/io5';
import { FaPeopleRoof } from 'react-icons/fa6';
import Header from '../../components/header/Header';


const AdminDAshboard =()=>{

    const totalStudents = 120;
    const totalStaffs = 25;
    const totalLibrarians = 10;
    const role="admin"
    return(
        <div className="flex">
      <Sidebar />
      <div className="flex-1">
      <Header role={role} />

        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card title="Total Students" number={totalStudents} icon={<FaPeopleRoof/>} />
          <Card title="Total Office Staffs" number={totalStaffs} icon={<MdPeopleAlt/>}/>
          <Card title="Total Librarians" number={totalLibrarians} icon={<IoLibrary/>} />
        </div>
      </div>
    </div>
    )
}
export default AdminDAshboard