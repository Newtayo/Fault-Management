    import React, { useRef, useState } from 'react'
    import { MdEmail } from "react-icons/md";
    import { FaPhone } from "react-icons/fa";
    import { IoKey } from "react-icons/io5";
    import { IoPerson } from "react-icons/io5";
    import { MdOutlineSportsHandball } from "react-icons/md";
    import { NavLink, useNavigate } from 'react-router-dom';
    import axios from 'axios';


    const SignUp = () => {
        const email = useRef();
        const password = useRef();
        const phone = useRef();
        const interest = useRef();
        const username = useRef();
        const passwordConfirmation = useRef()
        const [error, setError] = useState("");
        const [Loading, setLoading] = useState(false);
        const [message, setMessage] = useState('Sign Up Successful, Please Check your Mail')
        const [isSuccess, setIsSuccess] = useState(false)
        const [isError, setIsError] = useState(false)

        const signUp = async(e)=>{
            setLoading(true)
            setIsError(false)
            setIsSuccess(false)
            e.preventDefault();
                
            if(password.current.value !== passwordConfirmation.current.value){
                setError("Password does not match")
                setLoading(false)
                setIsError(true)
            }

            else{
                try {
                    setLoading(true)
                    const response  =   await axios.post(`${import.meta.env.VITE_BASEURL}/register`, {
                        email: email.current.value,
                        phoneNumber:phone.current.value,
                        password: password.current.value,
                        interest:interest.current.value,
                        username:username.current.value,
                      }, {
                        withCredentials: true 
                    })  
                    localStorage.setItem("user", response.data.user.email);
                    setLoading(false)
                    setIsSuccess(true)
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
        <div className='w-full flex flex-col justify-center items-center my-10'>
            <form className=' w-5/6 sm:w-2/6 flex flex-col justify-center items-center gap-2' onSubmit={signUp}>
            {isError && <div role="alert" className="alert alert-error py-1 bg-red rounded-lg ">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>{error}</span>
  </div>}
  {isSuccess && <div role="alert" className="alert alert-info">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <span>{message}</span>
</div>}
            <label className="input input-bordered flex items-center gap-2  w-full">
            <MdEmail />
             <input type="text" className="grow " placeholder="Email " ref={email} required />
             </label>
             <label className="input input-bordered flex items-center gap-2  w-full">
             <IoPerson />
             <input type="text" className="grow " placeholder="Username " ref={username} required />
             </label>
             <label className="input input-bordered flex items-center gap-2  w-full">
             <MdOutlineSportsHandball />
             <input type="text" className="grow " placeholder="Sporting Interest" ref={interest} required />
             </label>
             <label className="input input-bordered flex items-center gap-2  w-full">
             <FaPhone />
             <input type="tel" className="grow " pattern="[^\+]\d*"
             title="Phone number should not start with a '+' sign."
             placeholder="Phone Number" ref={phone}required />
             </label>
    <label className="input input-bordered flex items-center gap-2  w-full">
    <IoKey />
<input type="password" className="grow " placeholder="Password" ref={password} required />
    </label>
    <label className="input input-bordered flex items-center gap-2  w-full">
    <IoKey />
    <input type="password" className="grow " placeholder="Password Confirmation" ref={passwordConfirmation} required />
    </label>

    <button className="btn btn-success w-2/4 text-white" type='submit'>Register</button>
        {Loading && <span className="loading loading-bars loading-xs"></span>}
    <p>Already have an account? <NavLink to={'/'} className="text-blue-800">Login</NavLink></p>
    <p> <NavLink to={'/forgot-password'} className="text-blue-800">Forgot Password? </NavLink></p>
    </form>
        </div>

    </div>
    )
    }

    export default SignUp