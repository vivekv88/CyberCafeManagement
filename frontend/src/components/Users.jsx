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
    fetchUsers();
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
      fetchUsers();
      console.log(res);
    } catch (err) {
      console.error("Error starting time:", err);
    }
  };

  const endTime = async (id) => {
    try {
      const res = await axios.post(`https://cybercafemanagement.onrender.com/api/endTime/${id}`);
      fetchUsers();
      console.log(res);
    } catch (err) {
      console.error("Error ending time:", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-600 w-full md:w-[15vw] h-[10vh] md:h-screen flex md:flex-col items-center md:items-start justify-between md:justify-start px-4 py-2 md:py-6">
        <div className="flex items-center gap-2 md:flex-col md:items-start md:gap-5">
          <Link to={"/dashboard"}>
            <img
              className="w-[15vw] md:w-[10vw] cursor-pointer"
              src="/assets/logo1.png"
              alt="logo"
            />
          </Link>
          <h1 className="text-lg md:text-2xl font-semibold text-gray-900 font-serif">
            DIG-OS/Admin Panel
          </h1>
        </div>
        <ul className="hidden md:flex gap-5 flex-col ml-[20px] text-xl font-semibold text-white font-serif mt-5">
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

      {/* Main Section */}
      <div className="bg-cyan-50 flex-1 font-serif p-4">
        {/* Add User Button */}
        <div className="mb-4 flex justify-center md:justify-start mt-[12vh] md:mt-0">
          <Link to="/dashboard/addUser">
            <button className="cursor-pointer bg-red-500 text-lg md:text-xl text-white px-3 py-1 rounded-lg hover:bg-red-700">
              Add User
            </button>
          </Link>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-500 w-full text-center text-sm md:text-base">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-500 px-2 md:px-4 py-2">S.No.</th>
                <th className="border border-gray-500 px-2 md:px-4 py-2">Name</th>
                <th className="border border-gray-500 px-2 md:px-4 py-2">Address</th>
                <th className="border border-gray-500 px-2 md:px-4 py-2">ID Proof</th>
                <th className="border border-gray-500 px-2 md:px-4 py-2">Computer</th>
                <th className="border border-gray-500 px-2 md:px-4 py-2">Email</th>
                <th className="border border-gray-500 px-2 md:px-4 py-2">Mobile No.</th>
                <th className="border border-gray-500 px-2 md:px-4 py-2">Start Time</th>
                <th className="border border-gray-500 px-2 md:px-4 py-2">End Time</th>
                <th className="border border-gray-500 px-2 md:px-4 py-2">Bill</th>
                <th className="border border-gray-500 px-2 md:px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="border border-gray-500 px-2 md:px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-500 px-2 md:px-4 py-2">{user.name}</td>
                  <td className="border border-gray-500 px-2 md:px-4 py-2">{user.address}</td>
                  <td className="border border-gray-500 px-2 md:px-4 py-2">{user.id}</td>
                  <td className="border border-gray-500 px-2 md:px-4 py-2">{user.computer}</td>
                  <td className="border border-gray-500 px-2 md:px-4 py-2">{user.email}</td>
                  <td className="border border-gray-500 px-2 md:px-4 py-2">{user.mobile}</td>
                  <td className="border border-gray-500 px-2 md:px-4 py-2">
                    <button
                      onClick={() => startTime(user._id)}
                      className="cursor-pointer bg-red-500 text-white px-2 md:px-3 py-1 rounded hover:bg-red-700"
                    >
                      Start
                    </button>
                    {user.startTime && (
                      <div className="text-xs md:text-sm">
                        {new Date(user.startTime).toLocaleString()}
                      </div>
                    )}
                  </td>
                  <td className="border border-gray-500 px-2 md:px-4 py-2">
                    <button
                      onClick={() => endTime(user._id)}
                      className="cursor-pointer bg-red-500 text-white px-2 md:px-3 py-1 rounded hover:bg-red-700"
                    >
                      End
                    </button>
                    {user.endTime && (
                      <div className="text-xs md:text-sm">
                        {new Date(user.endTime).toLocaleString()}
                      </div>
                    )}
                  </td>
                  <td className="border border-gray-500 px-2 md:px-4 py-2">₹{user.bill}</td>
                  <td className="border border-gray-500 px-2 md:px-4 py-2">
                    <button
                      onClick={() => removeUser(user._id)}
                      className="cursor-pointer bg-red-500 text-white px-2 md:px-3 py-1 rounded hover:bg-red-700"
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
    </div>
  );
}

export default UserTable;
