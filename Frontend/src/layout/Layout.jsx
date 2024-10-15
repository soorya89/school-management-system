import React from 'react'
import { useLocation } from 'react-router-dom';
import Routers from '../routes/Routers'
import Navbar from '../components/Navbar/Navbar'


const Layout = () => {
  const location = useLocation();
  return (
    <div>
     {location.pathname !== '/' && <Navbar />}
      <Routers/>
      
    </div>
  )
}

export default Layout