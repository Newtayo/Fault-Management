import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaCcDiscover } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import axios from 'axios'

const Navbar = ({name}) => {

    const navigate = useNavigate()

    const logout =async()=>{
        try {
            const response  =   await axios.post(`${import.meta.env.VITE_BASEURL}/logout`, {

              }, {
                withCredentials: true 
            })  
                localStorage.clear()
                navigate('/')
        } catch (error) {
           console.log(error)
        }  
        
    }
  return (
    <div className='w-full flex flex-col'>
        <div className='sm:hidden flex'>
      <div className='w-3/4  flex justify-center items-center flex-col'>
        <h2 className=' w-1/4 pl-5'>Welcome</h2>
        <p className='font-bold w-3/4 text-center'> {name}</p>
        </div>
        <div  className="btn btn-ghost btn-circle avatar">
        
        <div className="w-10 rounded-full ">
           <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
        </div>
    <div className=" hidden sm:navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-3xl">Brillscomer</a>
  </div>
  <div className="flex-none gap-2 w-3/4">
    <NavLink className='w-1/4 py-2 hover:bg-stone-400 hover:rounded'to={'/userprofile'} ><div className='w-full flex flex-col  items-center justify-center ' >
    <FaHome /> <p>Home</p>
        </div></NavLink>
        <NavLink className='w-1/4 py-2 hover:bg-stone-400 hover:rounded' ><div className='w-full flex flex-col  items-center justify-center'>
        <FaUserFriends /> <p>Buddie</p>
        </div></NavLink>
        <NavLink className='w-1/4 py-2 hover:bg-stone-400 hover:rounded' ><div className='w-full flex flex-col  items-center justify-center'>
        <FaCcDiscover /> <p>Discover</p>
        </div></NavLink>
        <NavLink className='w-1/4 py-2 hover:bg-stone-400 hover:rounded'to={'/setting'} ><div className='w-full flex flex-col  items-center justify-center'>
        <IoSettingsOutline /><p>Settings</p>
        </div></NavLink>

    <div className="dropdown dropdown-end w-1/4 flex flex-col items-center ">
    
      <div  className="btn btn-ghost btn-circle avatar">
        
        <div className="w-10 rounded-full ">
           <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <p>{name} </p>
      </div>
      <button className='w-1/6 py-2 flex items-center justify-center  hover:bg-stone-400 hover:rounded' onClick={logout}> <IoMdLogOut />Logout</button>
  </div>
</div>
<hr className='border-t-4 border-black w-full'/>
    <div className="btm-nav sm:hidden lg:hidden">
    <NavLink to={'/userprofile'} className="bg-teal-200 text-teal-600 border-blue ">
  <FaHome />
    <span className="btm-nav-label">Home</span>
  </NavLink>
  <button className="bg-teal-200 text-teal-600 ">
  <FaUserFriends /> 
    <span className="btm-nav-label">Buddie</span>
  </button>
  <button className="bg-teal-200 text-teal-600 border-blue ">
  <FaCcDiscover />
    <span className="btm-nav-label">Discover</span>
  </button>
  
  <NavLink to={'/setting'} className="bg-teal-200 text-teal-600 border-blue ">
  <IoSettingsOutline />
    <span className="btm-nav-label">Settings</span>
    </NavLink>

  <button className="bg-teal-200 text-teal-600" onClick={logout}>
  <IoMdLogOut />
    <span className="btm-nav-label" >Logout</span>
  </button>
</div>

</div>
  )
}

export default Navbar