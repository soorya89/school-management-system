import UserList from "../list/UserList"
import Sidebar from "../sidebar/Sidebar"
import Header from "../header/Header"

const Users =()=>{
    return(
        <div>
       <div className="flex flex-row min-h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        <div className=""> 
          <UserList/>

        </div>
        
      </div>
      </div>
    </div>
    )
}
export default Users