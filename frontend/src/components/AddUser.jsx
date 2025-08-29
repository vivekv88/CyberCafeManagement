import axios from 'axios';
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';

function AddUser() {

    const navigate = useNavigate();

    const [menu, setMenu] = useState("Users")

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        id: "",
        computer: "",
        email: "",
        mobile: ""
    });

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/add", formData);
            alert("User added succesfully");
            setFormData({
                name: "",
                address: "",
                id: "",
                computer: "",
                email: "",
                mobile: ""
            })
            navigate('/dashboard/users')
        } catch (error) {
            console.log(error);
            alert("Error adding User")
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
                        href="/computers"
                        onClick={() => setMenu("Computers")}
                        className={menu === "Computers" ? "active" : ""}
                    >
                        Computers
                    </a>
                </ul>
            </div>

            <div className='absolute bg-cyan-200 h-full w-[85vw] ml-[15vw] font-serif'>
                <form onSubmit={submitHandler} className='ml-[25vw] mt-[7.2vh] border-1 shadow-lg shadow-cyan-900/90 border-black w-[35vw] px-5 py-5 rounded-lg'>
                    <h2 className="text-2xl mt-3 text-center text-yellow-700 font-bold mb-4">Register User</h2>

                    <label className="block mb-3 text-[12px]">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full text-gray-500 text-xl rounded-md bg-transparent outline-none border p-2 mb-4"
                        placeholder='Username'
                        required
                    />

                    <label className="block mb-3 text-[12px]">Address</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full text-gray-500 text-xl rounded-md bg-transparent outline-none border p-2 mb-4"
                        required
                    />

                    <label className="block mb-3 text-[12px]">ID</label>
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        className="w-full text-gray-500 text-xl rounded-md bg-transparent outline-none border p-2 mb-4"
                        required
                        placeholder='User Identity'
                    />

                    <label className="block mb-3 text-[12px]">Computer (PC Number)</label>
                    <input
                        type="text"
                        name="computer"
                        value={formData.computer}
                        onChange={handleChange}
                        className="w-full text-gray-500 text-xl rounded-md bg-transparent outline-none border p-2 mb-4"
                        required
                    />

                    <label className="block mb-3 text-[12px]">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full text-gray-500 text-xl rounded-md bg-transparent outline-none border p-2 mb-4"
                        required
                        placeholder='Email'
                    />

                    <label className="block mb-3 text-[12px]">Mobile</label>
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full text-gray-500 text-xl rounded-md bg-transparent outline-none border p-2 mb-5"
                        required
                        placeholder='Mobile Number'
                    />
                    <br />
                    <button
                        type="submit"
                        className="cursor-pointer ml-[13vw] bg-green-900 text-white px-4 py-2 rounded"
                    >
                        Add User
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddUser
