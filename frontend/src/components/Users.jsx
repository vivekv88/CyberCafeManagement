import React, { useEffect, useState } from "react";
import axios from "axios";

function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/users") // your backend API
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Cafe_ID</th><th>Name</th>
          <th>Address</th>
          <th>ID Proof</th>
          <th>Computer</th>
          <th>Email</th>
          <th>Mobile No.</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.id}</td>
            <td>{user.computer}</td>
            <td>{user.email}</td>
            <td>{user.mobile}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
