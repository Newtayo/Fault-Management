  import React, { useRef, useState } from 'react'
  import axios from 'axios';
  import { IoKey } from "react-icons/io5";
  import { MdEmail } from "react-icons/md";
  import { NavLink, useNavigate } from 'react-router-dom';
  import { useAuth } from '../context/AuthContext';



  const Login = () => {

      const email = useRef()
      const password = useRef()
      const {currentUser, setCurrentUser} = useAuth()
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState('')
      const [isError, setIsError] = useState(false)
      const navigate = useNavigate()


      const displayDetail =async(e)=>{
          e.preventDefault();
          setLoading(true)
          if ((email.current.value).startsWith('+')){
              
              try {
                  const response  =   await axios.post(`${import.meta.env.VITE_BASEURL}/login`, {
                      phoneNumber: email.current.value,
                      password: password.current.value,
                    }, {
                      withCredentials: true 
                  })  
                      setCurrentUser(response.data.user.email)
                      localStorage.setItem("user", response.data.user.email);
                      setLoading(false)
              } catch (error) {
                  console.log(error)
                  setLoading(false)
              }
          }
          else{
          try {
              const response  =   await axios.post(`${import.meta.env.VITE_BASEURL}/login`, {
                  email: email.current.value,
                  password: password.current.value,

                }, {
                  withCredentials: true 
              })  
                  setCurrentUser(response.data.user.email)
                  localStorage.setItem("user", response.data.user.email);
                  setLoading(false)
                  navigate('/userprofile')
          } catch (error) {
            setError(error.response.data.msg)
              setLoading(false)
              setIsError(true)
          }
      }
      }
    return (
      <div className='w-full flex flex-col'>
      <div className='w-full flex justify-start flex-col'>
          <h1 className='text-3xl  text-black'>Brillscomer </h1>
          <hr className='border-t-4 border-black w-full'/>
      </div>
      <div className='w-full h-96  flex flex-col justify-center items-center my-20'>
          <form className=' w-5/6 sm:w-2/6 flex flex-col justify-center items-center  gap-1' onSubmit={displayDetail}>
          {isError && <div role="alert" className="alert alert-error py-1 bg-red rounded-lg ">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>{error}</span>
  </div>}
  <label className="input input-bordered flex items-center gap-2  w-full">
  <MdEmail />
    <input type="text" className="grow " placeholder="Email or Phone " required ref={email}  />
  </label>
  <label className="input input-bordered flex items-center gap-2  w-full">
  <IoKey />
    <input type="password" className="grow " placeholder="Password" required ref={password} />
  </label>

  <button className="btn btn-success w-2/4 text-white" type='submit'>Login</button>
    {loading && <span className="loading loading-bars loading-xs"></span>}
  <p>You do not have an account? <NavLink to={'/signUp'} className="text-blue-800">Sign Up </NavLink></p>
  <p> <NavLink to={'/forgot-password'} className="text-blue-800">Forgot Password? </NavLink></p>

  </form>
      </div>

  </div>
    )
  }

  export default Login