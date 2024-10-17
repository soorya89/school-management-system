import Sidebar from "../sidebar/Sidebar"
import Header from "../header/Header"
import LibraryList from "../list/LibraryHistoryList"

const LibraryHistory =() =>{

    return(
        <div>
       <div className="flex flex-row min-h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        <div className=""> 
          <LibraryList/>

        </div>
        
      </div>
      </div>
    </div>
    )
}

export default LibraryHistory