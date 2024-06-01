import React, { useRef,useState } from 'react'
import { MdEmail } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const email = useRef()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('Error')
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState('Reset link has been sent to your email')
    const [isError, setIsError] = useState(false)

    const sentResetEmail =async(e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            const response  =   await axios.patch(`${import.meta.env.VITE_BASEURL}/reset-email`, {
                email: email.current.value,
              })
              setMessage(response.data.message)
              setLoading(false)
              setSuccess(true)
        } catch (error) {
            setError(error.response.data.msg)
            setLoading(false)
            setIsError(true)
        }

    }
    return (
      <div className='w-full flex flex-col'>
      <div className='w-full flex justify-start flex-col'>
          <h1 className='text-3xl  text-black'>Brillscomer </h1>
          <hr className='border-t-4 border-black w-full'/>
      </div>
      <div className='w-full h-96  flex flex-col justify-center items-center my-24'>
          <form className=' w-5/6 sm:w-2/6 flex flex-col justify-center items-center  gap-2' onSubmit={sentResetEmail}>
          {isError && <div role="alert" className="alert alert-error py-1 bg-red rounded-lg ">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>{error}</span>
  </div>}
  { success && <div role="alert" className="alert alert-info">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <span>{message}</span>
</div>}
  <label className="input input-bordered flex items-center gap-2  w-full">
  <MdEmail />
    <input type="text" className="grow " placeholder="Email" required ref={email}  />
  </label>
  <button className="btn btn-success w-2/4 text-white" type='submit'>Sent Reset Link</button>
  {loading &&<span className="loading loading-bars loading-xs"></span>}
  <p>You do not have an account? <NavLink to={'/signUp'} className="text-blue-800">Sign Up </NavLink></p>
  <p>Already have an account? <NavLink to={'/'} className="text-blue-800">Login</NavLink></p>
  </form>
      </div>
  
  </div>
  )
}

export default ForgotPassword