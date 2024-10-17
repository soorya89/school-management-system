
import StudentList from "../list/StudentList"
import Sidebar from "../sidebar/Sidebar"
import Header from "../header/Header"

const Student =()=>{
    return(
        <div>
       <div className="flex flex-row min-h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        <div className=""> 
          <StudentList/>

        </div>
        
      </div>
      </div>
    </div>
    )
}
export default Student