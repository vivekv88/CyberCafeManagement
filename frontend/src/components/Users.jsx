import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [menu, setMenu] = useState("Users");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users") // your backend API
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const removeUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/remove/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
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
          <Link
            onClick={() => setMenu("Dashboard")}
            className={menu === "Dashboard" ? "active" : ""}
          >
            Dashboard
          </Link>
          <a
            href="#users"
            onClick={() => setMenu("Users")}
            className={menu === "Users" ? "active" : ""}
          >
            Users
          </a>
          <a
            href="#computers"
            onClick={() => setMenu("Computers")}
            className={menu === "Computers" ? "active" : ""}
          >
            Computers
          </a>
          <a
            href="#Status"
            onClick={() => setMenu("Status")}
            className={menu === "Status" ? "active" : ""}
          >
            Status
          </a>
        </ul>
      </div>

      {/* Table */}
      <div className="absolute ml-[20vw] mt-[10px] font-serif">
        <div className="my-[20px]">
          <button className="cursor-pointer bg-red-500 text-xl text-white px-3 py-1 rounded-lg hover:bg-red-700" >Add User</button>
        </div>
        <table className="table-auto border-collapse border border-gray-500 w-[70vw] text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-500 px-4 py-2">S.No.</th>
              <th className="border border-gray-500 px-4 py-2">Name</th>
              <th className="border border-gray-500 px-4 py-2">Address</th>
              <th className="border border-gray-500 px-4 py-2">ID Proof</th>
              <th className="border border-gray-500 px-4 py-2">Computer</th>
              <th className="border border-gray-500 px-4 py-2">Email</th>
              <th className="border border-gray-500 px-4 py-2">Mobile No.</th>
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
