import axios from 'axios';
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';

function AddComputer() {

    const navigate = useNavigate();

    const [menu, setMenu] = useState("Users")

    const [formData, setFormData] = useState({
        systemName:"",
        systemLocation:""
    });

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/addComputer", formData);
            alert("Computer added succesfully");
            setFormData({
                systemName:"",
                systemLocation:""
            })
            navigate('/dashboard/computers')
        } catch (error) {
            console.log(error);
            alert("Error adding Computer")
        }
    }


    return (
        <div>
            <div className="fixed bg-gray-600 h-full w-[15vw]">
                <Link to={"/dashboard"}>
                    <img className="w-[10vw] cursor-pointer" src="/assets/logo1.png" />
                </Link>
                <h1 className="mb-[30px] ml-[10px] text-2xl font-semibold text-gray-900 font-serif">
                    DIG-OS/Admin Panel
                </h1>
                <ul className="flex gap-5 flex-col ml-[40px] text-xl font-semibold text-white font-serif">
                    <Link to={"/dashboard"}
                        onClick={() => setMenu("Dashboard")}
                        className={menu === "Dashboard" ? "active" : ""}
                    >
                        Dashboard
                    </Link>
                    <Link to={"/dashboard/users"}
                        onClick={() => setMenu("Users")}
                        className={menu === "Users" ? "active" : ""}
                    >
                        Users
                    </Link>
                    <a
                        href="/dashboard/computers"
                        onClick={() => setMenu("Computers")}
                        className={menu === "Computers" ? "active" : ""}
                    >
                        Computers
                    </a>
                    <a
                        href="/Status"
                        onClick={() => setMenu("Status")}
                        className={menu === "Status" ? "active" : ""}
                    >
                        Status
                    </a>
                </ul>
            </div>

            <div className='absolute bg-cyan-200 h-full w-[85vw] ml-[15vw] font-serif'>
                <form onSubmit={submitHandler} className='ml-[25vw] mt-[7.2vh] border-1 shadow-lg shadow-cyan-900/90 border-black w-[35vw] px-5 py-5 rounded-lg'>
                    <h2 className="text-2xl mt-3 text-center text-yellow-700 font-bold mb-4">Add Computer</h2>

                    <label className="block mb-3 text-[12px]">System Name</label>
                    <input
                        type="text"
                        name="systemName"
                        value={formData.systemName}
                        onChange={handleChange}
                        className="w-full text-gray-500 text-xl rounded-md bg-transparent outline-none border p-2 mb-4"
                        placeholder='System Name'
                        required
                    />

                    <label className="block mb-3 text-[12px]">System Location</label>
                    <input
                        type="text"
                        name="systemLocation"
                        placeholder="Location"
                        value={formData.systemLocation}
                        onChange={handleChange}
                        className="w-full text-gray-500 text-xl rounded-md bg-transparent outline-none border p-2 mb-4"
                        required
                    />

                    <br />
                    <button
                        type="submit"
                        className="cursor-pointer ml-[13vw] bg-green-900 text-white px-4 py-2 rounded"
                    >
                        Add Computer
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddComputer;
