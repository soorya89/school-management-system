

const Login = ()=>{
    return(
        <section className="px-5 py-40 lg:px-0">
    <div className='w-full max-w-[570px] mx-auto round-lg shadow-md md:p-10'>
      <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>Hello! <span className='text-[#60a5fa] '>  Welcome</span>  Back🎉</h3>
    

    <form className='py-4 md:py-0' >
      <div className='mb-5'>
        <input type='email'
         placeholder='Enter Your Email' 
         name='email' 
       
         className='w-full  py-3 border-b border-solid border-[#0066ff61] 
         focus:outline-none focus:border-b-primaryColor text-[16px] leadind-7 
         text-textColor placeholder:text-[#6A7D93]  cursor-pointer' required />
      </div>
      <div className='mb-5'>
        <input type='password'
         placeholder='Password' 
         name='password' 
         
         className='w-full  py-3 border-b border-solid border-[#0066ff61] 
         focus:outline-none focus:border-b-primaryColor text-[16px] leadind-7 
         text-textColor placeholder:text-[#6A7D93]  cursor-pointer' required />
      </div>

      <div className='mt-7'>
        <button type='sbmit' className='w-full bg-[#60a5fa] text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
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