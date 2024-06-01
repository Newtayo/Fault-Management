import React, { useRef, useState } from 'react'
import { IoKey } from "react-icons/io5";
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '../context/AuthContext';
import axios from 'axios'

const ChangePassword = () => {
    const password = useRef()
    const passwordConfirmation = useRef()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false)
    const [failed, setFailed] = useState(false)
    const [message, setMessage] = useState('')
    const {currentUser} = useAuth()

    const changePassword = async (e)=>{
        setLoading(true)
        setFailed(false)
        setSuccess(false)
        e.preventDefault()
        if(password.current.value !== passwordConfirmation.current.value){
            setFailed(true)
            setError('Password does not match')
            setLoading(false)
        }
        else{
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASEURL}/changepassword`, {
                    password: password.current.value,
                  }, {
                    withCredentials: true 
                }) 
                setMessage(response.data.msg)
                setLoading(false)
                setSuccess(true)
            } catch (error) {
                setLoading(false)
                setFailed(true)
                setError(error.response.data.msg)
            }
        }

    }

  return (
    <div className='w-full flex flex-col'>
    <Navbar name={currentUser}/>
    <div className='w-full h-96  flex flex-col justify-center items-center '>
        <form className=' w-5/6 sm:w-2/6 flex flex-col justify-center items-center  gap-2' onSubmit={changePassword }>
        {failed && <div role="alert" className="alert alert-error py-1 bg-red rounded-lg ">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>{error}</span>
  </div>}
  { success && <div role="alert" className="alert alert-info">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <span>{message}</span>
</div>}
<label className="input input-bordered flex items-center gap-2  w-full">
<IoKey />
  <input type="password" className="grow " placeholder="New Password" ref={password} />
</label>
<label className="input input-bordered flex items-center gap-2  w-full">
<IoKey />
  <input type="password" className="grow " placeholder="New Password Confirmation" required ref={passwordConfirmation}   />
</label>
<button className="btn btn-success w-2/4 text-white" type='submit'>Reset Password</button>
{loading && <span className="loading loading-bars loading-xs"></span>}

</form>
    </div>
    <Footer/>

</div>
  )
}

export default ChangePassword