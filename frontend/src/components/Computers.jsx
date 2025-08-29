import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ComputerTable() {
  const [computers, setComputers] = useState([]);
  const [menu, setMenu] = useState("Users");

  const fetchComputers = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/computers");
    setComputers(res.data);
  } catch (err) {
    console.error("Error fetching users:", err);
  }
};

useEffect(() => {
  fetchComputers(); // load when component mounts
}, []);

const toggleStatus = async (id) => {
    const res = await axios.patch(`http://localhost:3000/api/computers/${id}/toggle`);

    setComputers(prev =>
      prev.map((computer) => (computer._id === id ? res.data : computer))
    );
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
          <a
            href="/Status"
            onClick={() => setMenu("Status")}
            className={menu === "Status" ? "active" : ""}
          >
            Status
          </a>
        </ul>
      </div>

      {/* Table */}
      <div className="absolute bg-cyan-50 h-full w-[85vw] ml-[15vw] font-serif">
        <div className="mt-[10vh] mx-[7.5vw] mb-[20px]">
          <a href="/dashboard/addUser"><button className="cursor-pointer bg-red-500 text-xl text-white px-3 py-1 rounded-lg hover:bg-red-700" >Add Computer</button></a>
        </div>
        <table className="table-auto border-collapse m-auto border border-gray-500 w-[70vw] text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-500 px-4 py-2">S.No.</th>
              <th className="border border-gray-500 px-4 py-2">System Name</th>
              <th className="border border-gray-500 px-4 py-2">Location (Rank No.)</th>
              <th className="border border-gray-500 px-4 py-2">Status</th>
              <th className="border border-gray-500 px-4 py-2">Remove System</th>
            </tr>
          </thead>
          <tbody>
            {computers.map((computer, index) => (
              <tr key={computer._id} className="hover:bg-gray-100">
                <td className="border border-gray-500 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-500 px-4 py-2">{computer.systemName}</td>
                <td className="border border-gray-500 px-4 py-2">{computer.systemLocation}</td>
                <td className="border border-gray-500 px-4 py-2">
              <button
                onClick={() => toggleStatus(computer._id)}
                style={{
                  background: computer.inUse ? "red" : "green",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                {computer.inUse ? "In Use" : "Free"}
              </button>
            </td>
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

export default ComputerTable;
