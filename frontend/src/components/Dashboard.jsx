import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Dashboard = () => {

  const [menu, setMenu] = useState("Dashboard");
  const navigate = useNavigate();
  const [token, setToken] = useState("token")
  const [stats, setStats] = useState({ computers: 0, users: 0, vacant: 0 });

  const logout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token")
    setToken("");
    navigate('/')
  }

  const getStats = async () => {
    try {
      const res = await axios.get("https://cybercafemanagement.onrender.com/api/stats");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getStats();
  }, [])

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-600 w-[60vw] sm:w-[40vw] md:w-[25vw] lg:w-[15vw] p-4">
        <Link to={'/dashboard'}>
          <img className="w-[30vw] sm:w-[20vw] md:w-[10vw] cursor-pointer mb-4" src="/assets/logo1.png" alt="logo" />
        </Link>
        <h1 className="mb-6 text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 font-serif">DIG-OS/Admin Panel</h1>
        <ul className="flex flex-col gap-4 sm:gap-6 text-base sm:text-lg md:text-xl font-semibold text-white font-serif tracking-wide">
          <Link to="/dashboard" onClick={() => setMenu("Dashboard")} className={menu === "Dashboard" ? "active" : ""}>
            Dashboard
          </Link>
          <Link to="/dashboard/users" onClick={() => setMenu("Users")} className={menu === "Users" ? "active" : ""}>
            Users
          </Link>
          <Link to="/dashboard/computers" onClick={() => setMenu("Computers")} className={menu === "Computers" ? "active" : ""}>
            Computers
          </Link>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-cyan-100">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-6 sm:px-10 md:px-20 py-6 sm:py-10">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 font-serif">Dashboard</h1>
          <button
            onClick={logout}
            className="mt-4 sm:mt-0 cursor-pointer text-white text-sm sm:text-base font-serif font-semibold w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-900"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards in Column */}
        <div className="flex flex-col gap-6 items-center px-6 sm:px-10 md:px-20 pb-10">
          <div className="flex justify-between items-center w-full max-w-[500px] bg-blue-200 px-4 sm:px-6 py-6 shadow-lg shadow-blue-500 rounded-md">
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-red-900 font-serif">Total Computers</h1>
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-red-900 font-serif">{stats.computers}</h1>
          </div>
          <div className="flex justify-between items-center w-full max-w-[500px] bg-green-200 px-4 sm:px-6 py-6 shadow-lg shadow-green-500 rounded-md">
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-red-900 font-serif">Total Users</h1>
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-red-900 font-serif">{stats.users}</h1>
          </div>
          <div className="flex justify-between items-center w-full max-w-[500px] bg-red-200 px-4 sm:px-6 py-6 shadow-lg shadow-red-500 rounded-md">
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-red-900 font-serif">Vacant Computers</h1>
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-red-900 font-serif">{stats.vacant}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
