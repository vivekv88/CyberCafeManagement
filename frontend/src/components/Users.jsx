import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [menu, setMenu] = useState("Users");

  const fetchUsers = async () => {
  try {
    const res = await axios.get("https://cybercafemanagement.onrender.com/api/users");
    setUsers(res.data);
  } catch (err) {
    console.error("Error fetching users:", err);
  }
};

useEffect(() => {
  fetchUsers(); // load when component mounts
}, []);

  const removeUser = async (id) => {
    try {
      await axios.delete(`https://cybercafemanagement.onrender.com/api/remove/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Error removing user:", err);
    }
  };


  const startTime = async (id) => {
    try {
      const res = await axios.post(`https://cybercafemanagement.onrender.com/api/startTime/${id}`);
      fetchUsers()
      console.log(res);

    } catch (err) {
      console.error("Error removing user:", err);
    }
  };


  const endTime = async (id) => {
    try {
      const res = await axios.post(`https://cybercafemanagement.onrender.com/api/endTime/${id}`);
      fetchUsers()
      console.log(res);
      
    } catch (err) {
      console.error("Error removing user:", err);
    }
  };


  return (
    <div>
      {/* Sidebar */}
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
        </ul>
      </div>

      {/* Table */}
      <div className="absolute bg-cyan-50 h-full w-[85vw] ml-[15vw] font-serif">
        <div className="mt-[10vh] mx-[7.5vw] mb-[20px]">
          <a href="/dashboard/addUser"><button className="cursor-pointer bg-red-500 text-xl text-white px-3 py-1 rounded-lg hover:bg-red-700" >Add User</button></a>
        </div>
        <table className="table-auto border-collapse m-auto border border-gray-500 w-[70vw] text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-500 px-4 py-2">S.No.</th>
              <th className="border border-gray-500 px-4 py-2">Name</th>
              <th className="border border-gray-500 px-4 py-2">Address</th>
              <th className="border border-gray-500 px-4 py-2">ID Proof</th>
              <th className="border border-gray-500 px-4 py-2">Computer</th>
              <th className="border border-gray-500 px-4 py-2">Email</th>
              <th className="border border-gray-500 px-4 py-2">Mobile No.</th>
              <th className="border border-gray-500 px-4 py-2">Start Time</th>
              <th className="border border-gray-500 px-4 py-2">End Time</th>
              <th className="border border-gray-500 px-4 py-2">Bill</th>
              <th className="border border-gray-500 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="border border-gray-500 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-500 px-4 py-2">{user.name}</td>
                <td className="border border-gray-500 px-4 py-2">{user.address}</td>
                <td className="border border-gray-500 px-4 py-2">{user.id}</td>
                <td className="border border-gray-500 px-4 py-2">{user.computer}</td>
                <td className="border border-gray-500 px-4 py-2">{user.email}</td>
                <td className="border border-gray-500 px-4 py-2">{user.mobile}</td>
                <td className="border border-gray-500 px-4 py-2">
                  <button
                    onClick={() => startTime(user._id)}
                    className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Start
                  </button>
                  {user.startTime && <div>{new Date(user.startTime).toLocaleString()}</div>}
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  <button
                  onClick={() => endTime(user._id)}
                  className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  End
                </button>
                  {user.endTime && <div>{new Date(user.endTime).toLocaleString()}</div>}</td>
                <td className="border border-gray-500 px-4 py-2">₹{user.bill}</td>
                <td className="border border-gray-500 px-4 py-2">
                  <button
                    onClick={() => removeUser(user._id)}
                    className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
