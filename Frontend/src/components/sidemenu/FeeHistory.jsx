import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import FeeHistoryList from "../list/FeeHistoryList";

const FeeHistory = () =>{
    return(
        <div>
       <div className="flex flex-row min-h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        <div className=""> 
          <FeeHistoryList/>

        </div>
        
      </div>
      </div>
    </div>
    )
}
export default FeeHistory