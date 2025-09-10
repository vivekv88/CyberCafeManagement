import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("Users");

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    id: "",
    computer: "",
    email: "",
    mobile: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://cybercafemanagement.onrender.com/api/add",
        formData
      );
      alert("User added succesfully");
      setFormData({
        name: "",
        address: "",
        id: "",
        computer: "",
        email: "",
        mobile: "",
      });
      navigate("/dashboard/users");
    } catch (error) {
      console.log(error);
      alert("Error adding User");
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar / Navbar */}
      <div className="fixed md:relative bg-gray-600 h-[12vh] md:h-screen w-full md:w-[15vw] flex md:flex-col items-center md:items-start p-3 z-10">
        <Link to={"/dashboard"}>
          <img
            className="w-[25vw] md:w-[10vw] cursor-pointer"
            src="/assets/logo1.png"
            alt="logo"
          />
        </Link>
        <h1 className="hidden md:block mt-5 mb-[30px] ml-[10px] text-lg md:text-2xl font-semibold text-gray-900 font-serif">
          DIG-OS/Admin Panel
        </h1>
        <ul className="flex md:flex-col gap-4 md:gap-5 ml-0 md:ml-[40px] text-sm md:text-xl font-semibold text-white font-serif">
          <Link
            to="/dashboard"
            onClick={() => setMenu("Dashboard")}
            className={menu === "Dashboard" ? "active" : ""}
          >
            Dashboard
          </Link>
          <Link
            to="/dashboard/users"
            onClick={() => setMenu("Users")}
            className={menu === "Users" ? "active" : ""}
          >
            Users
          </Link>
          <Link
            to="/dashboard/computers"
            onClick={() => setMenu("Computers")}
            className={menu === "Computers" ? "active" : ""}
          >
            Computers
          </Link>
        </ul>
      </div>

      {/* Form */}
      <div className="md:absolute bg-cyan-200 min-h-screen w-full md:w-[85vw] md:ml-[15vw] font-serif flex justify-center items-start md:items-center py-6 pt-[14vh] md:pt-0">
        <form
          onSubmit={submitHandler}
          className="w-[90%] sm:w-[70%] md:w-[35vw] outline-none shadow-lg shadow-cyan-900/90 border-black px-5 py-5 rounded-lg bg-cyan-100/10 backdrop-blur-sm"
        >
          <h2 className="text-lg md:text-2xl mt-3 text-center text-yellow-700 font-bold mb-4">
            Register User
          </h2>

          <label className="block mb-3 text-xs md:text-sm">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full text-gray-500 text-base md:text-xl rounded-md bg-transparent outline-none border p-2 mb-4"
            placeholder="Username"
            required
          />

          <label className="block mb-3 text-xs md:text-sm">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full text-gray-500 text-base md:text-xl rounded-md bg-transparent outline-none border p-2 mb-4"
            required
          />

          <label className="block mb-3 text-xs md:text-sm">ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="w-full text-gray-500 text-base md:text-xl rounded-md bg-transparent outline-none border p-2 mb-4"
            required
            placeholder="User Identity"
          />

          <label className="block mb-3 text-xs md:text-sm">
            Computer (PC Number)
          </label>
          <input
            type="text"
            name="computer"
            value={formData.computer}
            onChange={handleChange}
            className="w-full text-gray-500 text-base md:text-xl rounded-md bg-transparent outline-none border p-2 mb-4"
            required
          />

          <label className="block mb-3 text-xs md:text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full text-gray-500 text-base md:text-xl rounded-md bg-transparent outline-none border p-2 mb-4"
            required
            placeholder="Email"
          />

          <label className="block mb-3 text-xs md:text-sm">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full text-gray-500 text-base md:text-xl rounded-md bg-transparent outline-none border p-2 mb-5"
            required
            placeholder="Mobile Number"
          />

          <button
            type="submit"
            className="cursor-pointer w-full md:w-auto md:ml-[8vw] bg-green-900 text-white px-4 py-2 rounded text-sm md:text-base"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
