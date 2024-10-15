import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Login from '../components/Login/Login'
import Admin from '../components/AdminDashboard/AdminDashboard'
import AddUser from '../components/AdminDashboard/AddUser'


const Routers = () => {
    return (
      <Routes>
     
        <Route path='/' element={<Login/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/add-user' element={<AddUser/>}/>
    
      </Routes>
    )
  }
  
  export default Routers