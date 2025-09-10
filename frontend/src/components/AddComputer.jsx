import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function AddComputer() {
    const navigate = useNavigate();

    const [menu, setMenu] = useState("Computers");

    const [formData, setFormData] = useState({
        systemName: "",
        systemLocation: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://cybercafemanagement.onrender.com/api/addComputer", formData);
            alert("Computer added successfully");
            setFormData({
                systemName: "",
                systemLocation: ""
            })
            navigate('/dashboard/computers');
        } catch (error) {
            console.log(error);
            alert("Error adding Computer");
        }
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Sidebar / Navbar */}
            <div className="bg-gray-600 w-full md:w-[15vw] flex items-center md:items-start justify-between md:justify-start px-4 py-4 md:flex-col fixed md:static z-20">
                
                {/* Logo + Heading */}
                <div className="flex items-center gap-4 md:flex-col md:items-center md:gap-4 mb-0 md:mb-6">
                    <Link to={"/dashboard"}>
                        <img className="w-[18vw] md:w-[10vw] cursor-pointer" src="/assets/logo1.png" alt="logo" />
                    </Link>
                    <h1 className="text-lg md:text-xl font-semibold text-gray-900 font-serif hidden md:block text-center">
                        DIG-OS <br /> Admin Panel
                    </h1>
                </div>

                {/* Menu */}
                <ul className="flex gap-6 md:flex-col md:gap-6 text-base md:text-lg font-semibold text-white font-serif mt-0 md:mt-6">
                    <Link to="/dashboard" onClick={() => setMenu("Dashboard")} className={menu === "Dashboard" ? "text-yellow-300" : ""}>
                        Dashboard
                    </Link>
                    <Link to="/dashboard/users" onClick={() => setMenu("Users")} className={menu === "Users" ? "text-yellow-300" : ""}>
                        Users
                    </Link>
                    <Link to="/dashboard/computers" onClick={() => setMenu("Computers")} className={menu === "Computers" ? "text-yellow-300" : ""}>
                        Computers
                    </Link>
                </ul>
            </div>

            {/* Form */}
            <div className="md:absolute bg-cyan-200 min-h-screen w-full md:w-[85vw] md:ml-[15vw] font-serif flex justify-center items-start md:items-center py-6 pt-[14vh] md:pt-0">
                <form
                    onSubmit={submitHandler}
                    className="w-[90%] sm:w-[70%] md:w-[35vw] border shadow-lg shadow-cyan-900/40 border-black/20 px-5 py-5 rounded-lg bg-cyan-100/50 backdrop-blur-sm"
                >
                    <h2 className="text-lg md:text-2xl mt-3 text-center text-yellow-700 font-bold mb-6">
                        Add Computer
                    </h2>

                    <label className="block mb-3 text-sm">System Name</label>
                    <input
                        type="text"
                        name="systemName"
                        value={formData.systemName}
                        onChange={handleChange}
                        className="w-full text-gray-500 text-lg rounded-md bg-transparent outline-none border p-2 mb-5"
                        placeholder="System Name"
                        required
                    />

                    <label className="block mb-3 text-sm">System Location</label>
                    <input
                        type="text"
                        name="systemLocation"
                        placeholder="Location"
                        value={formData.systemLocation}
                        onChange={handleChange}
                        className="w-full text-gray-500 text-lg rounded-md bg-transparent outline-none border p-2 mb-5"
                        required
                    />

                    <button
                        type="submit"
                        className="cursor-pointer block mx-auto mt-6 bg-green-900 text-white px-6 py-2 rounded"
                    >
                        Add Computer
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddComputer;
