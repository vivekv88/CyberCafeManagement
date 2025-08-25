import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Dashboard = () => {

  const [menu, setMenu] = useState("Dashboard");
  const navigate = useNavigate();
  const [token,setToken] = useState("token")

  const logout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token")
    setToken("");
    navigate('/')
  }

  return (
    <div>
      <div className='absolute bg-gray-600 h-full w-[15vw]'>
        <Link to={'/dashboard'}><img className='w-[10vw] cursor-pointer' src="/assets/logo1.png"></img></Link>
        <h1 className='mb-[30px] ml-[10px] text-2xl font-semibold text-gray-900 font-serif text-shadow-lg text-shadow-sky-300'>DIG-OS/Admin Panel</h1>
        <ul className='flex gap-5 flex-col ml-[40px] text-xl font-semibold text-white font-serif text-shadow-xs text-shadow-red-300 tracking-wide'>
          <Link to={"/dashboard"} onClick={() => setMenu("dashboard")} className={menu === "Dashboard" ? "active" : ""}>Dashboard</Link>
          <a href='/dashboard/users' onClick={() => setMenu("Users")} className={menu === "Users" ? "active" : ""}>Users</a>
          <a href='/computers' onClick={() => setMenu("Computers")} className={menu === "Computers" ? "active" : ""}>Computers</a>
          <a href='/Status' onClick={() => setMenu("Status")} className={menu === "Status" ? "active" : ""}>Status</a>
        </ul>
      </div>
      <div className='w-[2px] h-[100vh] bg-red-900 ml-[15vw] mt-[0px] relative'>
        <div className='bg-cyan-100 w-[84.9vw] h-full ml-[1px]'>
          <div className='flex justify-between items-center px-[170px] py-[50px]'> 
          <h1 className='text-3xl font-semibold text-gray-900 font-serif text-shadow-lg text-shadow-sky-300'>Dashboard</h1>
          <button onClick={logout} className='cursor-pointer text-white text-[12px] font-serif font-semibold w-[5.4vw] py-2 rounded-lg  bg-gray-900 mb-[10px]'>Logout</button>

          </div>
          <div className='flex justify-between items-center gap-[10vw] ml-[13vw] mb-[8vh] max-w-[28vw] bg-blue-200 h-auto px-[2.5vw] py-[4vh] shadow-lg shadow-blue-500 rounded-md '>
            <h1 className='text-2xl font-semibold text-red-900 font-serif text-shadow-lg text-shadow-sky-300'>Total Computers</h1>
            <h1 className='text-2xl font-semibold text-red-900 font-serif text-shadow-lg text-shadow-sky-300'>5</h1>
          </div>
          <div className='flex justify-between items-center gap-[10vw] ml-[13vw] mb-[8vh] max-w-[28vw] bg-green-200 h-auto px-[2.5vw] py-[4vh] shadow-lg shadow-green-500 rounded-md '>
            <h1 className='text-2xl font-semibold text-red-900 font-serif text-shadow-lg text-shadow-sky-300'>Total Users</h1>
            <h1 className='text-2xl font-semibold text-red-900 font-serif text-shadow-lg text-shadow-sky-300'>5</h1>
          </div>
          <div className='flex justify-between items-center gap-[10vw] ml-[13vw] mb-[8vh] max-w-[28vw] bg-red-200 h-auto px-[2.5vw] py-[4vh] shadow-lg shadow-red-500 rounded-md '>
            <h1 className='text-2xl font-semibold text-red-900 font-serif text-shadow-lg text-shadow-sky-300'>Computers Under Maintenance</h1>
            <h1 className='text-2xl font-semibold text-red-900 font-serif text-shadow-lg text-shadow-sky-300'>2</h1>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
