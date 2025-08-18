import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const [menu, setMenu] = useState("Dashboard");
  const navigate = useNavigate();

  return (
    <div>
      <div className='absolute bg-yellow-200 h-full w-[15vw]'>
        <Link to={'/dashboard'}><img className='w-[10vw] cursor-pointer' src="/assets/logo1.png"></img></Link>
        <h1 className='mb-[30px] ml-[10px]'>DIG-OS/Admin Panel</h1>
        <ul className='flex gap-5 flex-col ml-[40px]'>
          <Link onClick={() => setMenu("dashboard")} className={menu === "Dashboard" ? "active" : ""}>Dashboard</Link>
          <a href='#users' onClick={() => setMenu("Users")} className={menu === "Users" ? "active" : ""}>Users</a>
          <a href='#app-download' onClick={() => setMenu("Mobile-App")} className={menu === "Computers" ? "active" : ""}>Computers</a>
          <a href='#Status' onClick={() => setMenu("Status")} className={menu === "Status" ? "active" : ""}>Status</a>
        </ul>
      </div>
      <div className='w-[1px] h-[100vh] bg-red-900 ml-[15vw] mt-[0px] relative'>
        <div className='bg-cyan-200 w-[84.9vw] h-full ml-[1px]'>
          <h1 className='ml-[170px] mb-[4vh] py-[5vh]'>Dashboard</h1>
          <div className='flex justify-between items-center gap-[10vw] ml-[13vw] mb-[8vh] max-w-[28vw] bg-blue-200 h-[13vh] px-[2.5vw] py-[4vh] shadow-lg shadow-blue-500 rounded-md '>
            <h1 className='text-2xl font-semibold text-red-900 font-serif text-shadow-lg text-shadow-sky-300'>Total Computers</h1>
            <h1 className='text-2xl font-semibold text-red-900 font-serif text-shadow-lg text-shadow-sky-300'>5</h1>
          </div>
          <div className='flex justify-between items-center gap-[10vw] ml-[13vw] mb-[8vh] max-w-[28vw] bg-green-200 h-[13vh] px-[2.5vw] py-[4vh] shadow-lg shadow-green-500 rounded-md '>
            <h1 className='text-2xl font-semibold text-red-900 font-serif text-shadow-lg text-shadow-sky-300'>Total Users</h1>
            <h1 className='text-2xl font-semibold text-red-900 font-serif text-shadow-lg text-shadow-sky-300'>5</h1>
          </div>
          <div className='flex justify-between items-center gap-[10vw] ml-[13vw] mb-[8vh] max-w-[28vw] bg-red-200 h-[13vh] px-[2.5vw] py-[4vh] shadow-lg shadow-red-500 rounded-md '>
            <h1 className='text-2xl font-semibold text-red-900 font-serif text-shadow-lg text-shadow-sky-300'>Computers Under Maintenance</h1>
            <h1 className='text-2xl font-semibold text-red-900 font-serif text-shadow-lg text-shadow-sky-300'>2</h1>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
