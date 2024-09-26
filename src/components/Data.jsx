import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Data() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecord();
  }, []);

  const fetchRecord = () => {
    fetch("http://localhost:3000/user")
      .then(async (res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        console.log(data); // Log data to check response structure
        setUsers(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  };

  const deleteData = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(`http://localhost:3000/user/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          fetchRecord();
        })
        .catch((err) => {
          console.error("Delete error:", err);
        });
    }
  };

  const editData = (id) => {
    navigate(`/editData/${id}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-8xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          List of Users
        </h1>
        <table className="table-auto w-full text-left border-separate border-spacing-2">
          <thead>
            <tr className="bg-indigo-600 text-white text-lg">
              <th className="p-4 text-center">Name</th>
              <th className="p-4 text-center">Email</th>
              <th className="p-4 text-center">Password</th>
              <th className="p-4 text-center">Phone</th>
              <th className="p-4 text-center">Gender</th>
              <th className="p-4 text-center">Hobby</th>
              <th className="p-4 text-center">Address</th>
              <th className="p-4 text-center">City</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="bg-gray-100 hover:bg-gray-200 transition duration-300"
              >
                <td className="p-4 text-center">{user.name}</td>
                <td className="p-4 text-center">{user.email}</td>
                <td className="p-4 text-center">{user.password}</td>
                <td className="p-4 text-center">{user.phone}</td>
                <td className="p-4 text-center">{user.gender}</td>
                <td className="p-4 text-center">
                  {Array.isArray(user.hobby)
                    ? user.hobby.join(", ")
                    : user.hobby}
                </td>
                <td className="p-4 text-center">{user.address}</td>
                <td className="p-4 text-center">{user.city}</td>
                <td className="p-4 flex justify-center space-x-2">
                  <button
                    onClick={() => editData(user.id)}
                    className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteData(user.id)}
                    className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="bg-blue-500 text-white py-2 px-8 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Add Data
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Data;
