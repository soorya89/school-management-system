import React from 'react'
import { useLocation } from 'react-router-dom';
import Routers from '../routes/Routers'



const Layout = () => {
  const location = useLocation();
  return (
    <div>

      <Routers/>
      
    </div>
  )
}

export default Layout