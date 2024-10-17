import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store/store'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <BrowserRouter>   
    <ToastContainer
    theme='dark'
    position='top-right'
    closeOnClick
    pauseOnHover={false}/>
    <App />
    </BrowserRouter> 
  </React.StrictMode>
  </Provider>
)
