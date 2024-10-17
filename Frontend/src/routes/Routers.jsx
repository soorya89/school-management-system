import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Login from '../components/Login/Login'
import AdminDashboard from '../pages/Dashboards/AdminDashboard'
import User from '../components/sidemenu/Users'
import Student from '../components/sidemenu/Student'
import LibraryHistory from '../components/sidemenu/LibraryHistory'
import FeeHistory from '../components/sidemenu/FeeHistory'




const Routers = () => {
    return (
      
      <Routes>
     
        <Route path='/' element={<Login/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin/users' element={<User/>}/>
        <Route path='/admin/students' element={<Student/>}/>
        <Route path='/admin/library' element={<LibraryHistory/>}/>
        <Route path='/admin/fees' element={<FeeHistory/>}/>
    
      </Routes>
     
    )
  }
  
  export default Routers