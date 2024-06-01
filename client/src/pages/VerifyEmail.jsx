import React, { useEffect, useState } from 'react'
import { useNavigate, useNavigation, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'



const VerifyEmail = () => {
    const [searchParams] = useSearchParams()
    const id = searchParams.get("verifactionToken")
    const phone = searchParams.get("phone")
    const email =searchParams.get("email")
    const navigation = useNavigate()
    const [message, setMessage]= useState('Verifying Your Email')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const getUser = async()=>{
        try {
          setLoading(true)
            const response  =   await axios.patch(`${import.meta.env.VITE_BASEURL}/verify-email`, {
                email: email,
                verificationToken:id,
              }, {
                withCredentials: true 
            })  
            setLoading(false)

            navigation(`/otp-verification?phone=${phone}`)
        } catch (error) {
          setLoading(false)
          setMessage('Email Verification Failed')
          console.log(error)
        }
        
    }
    useEffect(()=>{
        getUser()
    }, [])
  return (
    <div className='w-full flex flex-col'>
        <div className='w-full flex justify-start flex-col'>
            <h1 className='text-3xl  text-black'>Brillscomer </h1>
            <hr className='border-t-4 border-black w-full'/>
            <div className='w-3/4 flex mx-auto flex-col items-center'>
              <h6 className='text-2xl'>{message}</h6>
              <h6 className='text-2xl'>{email}</h6>
              {loading && <span className="loading loading-bars loading-xs"></span>}
            </div>
        </div>

    </div>
  )
}

export default VerifyEmail