import React, { useState } from 'react'
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';



const Profile = () => {

    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [interest, setInterest] = useState('')
    const getDetails = async()=>{
        try {
                const response = await axios.get(`${import.meta.env.VITE_BASEURL}/getprofile`,{
                    withCredentials: true 
                })
                setUsername(response.data.profile.username)
                setEmail(response.data.profile.email)
                setPhone(response.data.profile.phoneNumber)
                setInterest(response.data.profile.interest)
        } catch (error) {
            console.log(error)
        }
    }
    getDetails()
  return (
    <div className='w-full flex flex-col'>
        <Navbar name={email}/>
    <div className='w-3/4 mx-auto flex-col'>

        <div className="sm:card sm:card-side bg-base-100 shadow-xl">
  <figure><img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" className='w-72' alt="Movie"/></figure>
  <div className="card-body">
    <h2 className="card-title text-3xl">Profile Card</h2>
    <p className='font-bold'>Username: {username}</p>
    <p className='font-bold'>Phone Number: {phone}</p>
    <p className='font-bold'>Email: { email}</p>
    <p className='font-bold'>Interest: {interest}</p>
    <div className="card-actions justify-end">
    <img src="https://www.shutterstock.com/image-vector/grunge-red-approved-square-rubber-600nw-587565557.jpg" className='w-24' alt="Movie"/>
    </div>
  </div>
</div>
    </div>
    <Footer/>
    </div>
  )
}

export default Profile