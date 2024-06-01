import React, { useRef, useState } from 'react'
import { MdEmail } from "react-icons/md";
import { NavLink, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const password = useRef()
    const [searchParams] = useSearchParams()
    const passwordConfirmation = useRef()
    const resetToken = searchParams.get('resetToken')
    const email = searchParams.get('email')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState('')
    const [isError, setIsError] = useState(false)
    const passwordReset = async (e)=>{

        e.preventDefault()
        if(password.current.value !== passwordConfirmation.current.value){
            setError("Password does not match")
        }
        else{
        try {
              setLoading(true)
              setIsError(false)
              setSuccess(false)
        const response  =   await axios.post(`${import.meta.env.VITE_BASEURL}/resetpassword`, {
            email: email,
            resetToken: resetToken,
            password: password.current.value
          })
          setMessage(response.data.message) 
          setLoading(false)
          setSuccess(true)
    } catch (error) {
        console.log(error) 
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
    <div className='w-full h-96  flex flex-col justify-center items-center my-24'>
        <form className=' w-5/6 sm:w-2/6 flex flex-col justify-center items-center  gap-2' onSubmit={passwordReset}>
        {isError &&<div role="alert" className="alert alert-error py-1 bg-red rounded-lg ">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>{error}</span>
  </div>}
  { success && <div role="alert" className="alert alert-info">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <span>{message}</span>
</div>}
<label className="input input-bordered flex items-center gap-2  w-full">
<MdEmail />
  <input type="password" className="grow " placeholder="New Password" required ref={password}  />
</label>
<label className="input input-bordered flex items-center gap-2  w-full">
<MdEmail />
  <input type="password" className="grow " placeholder="New Password Confirmation" required ref={passwordConfirmation}  />
</label>
<button className="btn btn-success w-2/4 text-white" type='submit'>Reset Password</button>
{loading && <span className="loading loading-bars loading-xs"></span>}

</form>
    </div>

</div>
  )
}

export default ResetPassword