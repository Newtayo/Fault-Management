import React, {useRef, useState}from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const Otp = () => {

const [searchParams] = useSearchParams()
const phone = searchParams.get("phone")
const otp = useRef()
const [loading, setLoading] = useState(false)
const [message,setMessage] = useState('')
const [error, setError] = useState('')
const [success, setSuccess] = useState(false)
const [failed, setFailed]= useState(false)

const sendOTP = async() =>{
    setLoading(true)
    try {
        const response  =   await axios.post(`${import.meta.env.VITE_BASEURL}/sendotp`, {
            phone: `+${phone}`,
          }, {
            withCredentials: true 
        }) 
        setMessage(response.data.msg)
        setLoading(false)
        setSuccess(true)
    } catch (error) {
        setError(error.response.data.msg)
        setLoading(false)
        setFailed(true)
    }
}

const verifyOTP = async(e) =>{
    setLoading(true)
    setSuccess(false)
    setFailed(false)
    e.preventDefault()
    try {
        const response  =   await axios.post(`${import.meta.env.VITE_BASEURL}/verifyotp`, {
            otp: otp.current.value,
          }, {
            withCredentials: true 
        }) 
        setMessage(response.data.msg)
        setLoading(false)
        setSuccess(true)
    } catch (error) {
        setError(error.response.data.msg)
        setLoading(false)
        setFailed(true)
    }
}
  return (
    <div className='w-full flex flex-col'>
    <div className='w-full flex justify-start flex-col'>
        <h1 className='text-3xl  text-black'>Brillscomer </h1>
        <hr className='border-t-4 border-black w-full'/>
    <div className=' h-96 flex flex-col w-full items-center justify-center border'>
                        <button onClick={sendOTP}> Click here to Send OTP  Code  to {phone}? </button>
         <form className=' w-5/6 sm:w-2/6 flex flex-col justify-center items-center  gap-2' onSubmit={verifyOTP}>
        <label className="input input-bordered flex items-center gap-2  w-full">    
        <input type="text" className="grow " placeholder="OTP" ref={otp} />
        </label>

<button className="btn btn-success w-2/4 text-white" type='submit'>Verify</button>
{failed && <div role="alert" className="alert alert-error py-1 bg-red rounded-lg ">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>{error}</span>
  </div>}
  {success && <div role="alert" className="alert alert-info">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <span>{message}</span>
</div>}
{loading && <span className="loading loading-bars loading-xs"></span>}
<p>If Verified, Login<NavLink to={'/'} className="text-blue-800"> Here</NavLink></p>
</form>
    </div>
    </div>
    </div>
  )
}

export default Otp