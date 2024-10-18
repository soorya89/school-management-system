import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from '../../redux/actions/authAction';
import Loading from '../../components/Loader/Loading'

const Login = ()=>{
  const [credentials,setCredentials]=useState({
    email:"",
    password:""
  })

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const login=useSelector((state)=>state.auth)
  const {loading=false,userInfo}=login || {}
  const userRef=useRef(null)

  useEffect(()=>{
    if(userRef.current){
      userRef.current.focus()
    }
  },[])
  useEffect(() => {
    const storedUserInfo = sessionStorage.getItem("userInfo");
    console.log("Stored User Info:", storedUserInfo)
  }, []);
  

  useEffect(() => {
    if (userInfo) {
      const role = userInfo.user?.role || []
      if (role[0] === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "officeStaff") {
        navigate("/staff");
      } else if (role === "librarian") {
        navigate("/librarian");
      }
    }
  }, [userInfo, navigate]);

  const handleInputChange = (e) => {
    setCredentials({...credentials,[e.target.name]:e.target.value})
}
const handleLogin =async (e)=>{
  e.preventDefault()
  console.log(credentials,"///////////")
  dispatch(LOGIN({credentials,navigate}))
}
if (loading) {

  return <Loading />;
}
    return(
        <section className="px-5 py-40 lg:px-0">
    <div className='w-full max-w-[570px] mx-auto round-lg shadow-md md:p-10 '>
      <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>LOGIN, <span className='text-[#60a5fa] '>  Welcome</span>  Back</h3>
    

    <form className='py-4 md:py-0' onSubmit={handleLogin}>
      <div className='mb-5'>
        <input type='email'
         placeholder='Enter Your Email' 
         name='email' 
         onChange={handleInputChange}
         className='w-full  py-3 border-b border-solid border-[#0066ff61] 
         focus:outline-none focus:border-b-primaryColor text-[16px] leadind-7 
         text-textColor placeholder:text-[#6A7D93]  cursor-pointer' required />
      </div>
      <div className='mb-5'>
        <input type='password'
         placeholder='Password' 
         name='password' 
         onChange={handleInputChange}
         className='w-full  py-3 border-b border-solid border-[#0066ff61] 
         focus:outline-none focus:border-b-primaryColor text-[16px] leadind-7 
         text-textColor placeholder:text-[#6A7D93]  cursor-pointer' required />
      </div>

      <div className='mt-7'>
        <button type='sbmit' className='w-full bg-gray-700 text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
       Login
          </button>
      </div>

      {/* <p className='mt-5 text-textColor text-center'>Don't have an account? 
      <Link to='/register' className='text-primaryColor font-medium ml-1'>Signup</Link>
      </p> */}
    </form>
    </div>
  </section>
    )
}
export default Login