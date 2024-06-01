import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { NavLink } from 'react-router-dom'
import { IoKey } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { useAuth } from '../context/AuthContext';

const Setting = () => {
    const {currentUser} = useAuth()
  return (
    <div>
        <Navbar name={currentUser}/>
        <div className='w-full sm:w-3/4 border h-96 mx-auto shadow-2xl flex flex-col'>
            <h2 className='text-2xl font-bold text-center'>Privacy and Setting</h2>
            <div className='w-3/4 flex flex-col  mx-auto gap-5 mt-5'>
            <NavLink to={'/changepassword'}>
                <div className='w-5/6 mx-auto  flex'>
                    <p className='w-3/4 flex items-center font-bold'><IoKey /> Password Change </p>
                </div>
                </NavLink>
                <NavLink  to={'/changeemail'}>
                <div className='w-5/6 mx-auto  flex'>
                    <p className='w-3/4 flex items-center font-bold'> <MdEmail />Udpate Email  </p>
                </div>
                </NavLink>
                <NavLink to={'/changeusername'}>
                <div className='w-5/6 mx-auto  flex'>
                    <p className='w-3/4 flex items-center font-bold'><IoPerson />Update Username</p>
                </div>
                </NavLink>
            </div>

        </div>
        <Footer/>
    </div>
  )
}

export default Setting