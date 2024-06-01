import React, {useState, useRef} from 'react'
import { MdEmail } from "react-icons/md";
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '../context/AuthContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const ChangeEmail = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false)
    const [failed, setFailed] = useState(false)
    const [message, setMessage] = useState('')
    const [logout, setLogout] = useState(false)
    const {currentUser} = useAuth
    const newEmail = useRef()
    const navigate = useNavigate()
    const changeEmail = async(e)=>{
        e.preventDefault()
        setLoading(true)
        setSuccess(false)
        setFailed(false)
        try{
        const response = await axios.patch(`${import.meta.env.VITE_BASEURL}/changeemail`, {
            email: newEmail.current.value,
          }, {
            withCredentials: true 
        }) 
        setMessage(response.data.msg)
        setLoading(false)
        setSuccess(true)
        setLogout(true)
        setTimeout(()=>{
            navigate('/')
        }, 5000)
    }
        catch(error){
            setLoading(false)
            setFailed(true)
            setError(error.response.data.msg)
        }
    }
  return (
    <div className='w-full flex flex-col'>
    <Navbar name={currentUser}/>
    <div className='w-full h-96  flex flex-col justify-center items-center '>
        <form className=' w-5/6 sm:w-2/6 flex flex-col justify-center items-center  gap-2' onSubmit={changeEmail}>
        {failed && <div role="alert" className="alert alert-error py-1 bg-red rounded-lg ">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>{error}</span>
  </div>}
  { success && <div role="alert" className="alert alert-info">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <span>{message}</span>
</div>}
<label className="input input-bordered flex items-center gap-2  w-full">
<MdEmail />
  <input type="text" className="grow " placeholder="New Email"  ref={newEmail} />
</label>
<button className="btn btn-success w-2/4 text-white" type='submit'>Submit</button>
{loading && <span className="loading loading-bars loading-xs"></span>}
{logout && <p>Logging out <span className="loading loading-bars loading-xs"></span></p>}
</form>
    </div>
    <Footer/>

</div>
  )
}

export default ChangeEmail