"use client";
import React, { useState, useEffect } from 'react';

function AllInfo({ handleEditClick }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch data from the API endpoint when the component is rendered
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/getApi');
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Call the fetchData function when the component is rendered
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch('http://localhost:3000/api/deletApi', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        // If the deletion is successful, update the users state
        setUsers(users.filter((user) => user.id !== id));
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = async (id) => {
    // Fetch updated data before finding the selected user
    await fetchData();

    // Find the selected user by ID within the updated state
    const userToEdit = users.find((user) => user.id === id);

    // Set the selected user in the state for editing
    setSelectedUser(userToEdit);

    // Call the edit click handler
    handleEditClick(userToEdit);
  };

  return (
    <div className='mt-8'>
      <h2 className='text-xl font-semibold mb-4'>Information Table</h2>
      <table className='table-auto w-full'>
        <thead>
          <tr>
            <th className='border px-4 py-2'>Name</th>
            <th className='border px-4 py-2'>Email</th>
            <th className='border px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className='border px-4 py-2'>{user.name}</td>
              <td className='border px-4 py-2'>{user.email}</td>
              <td className='border px-4 py-2'>
                <button
                  className='bg-yellow-500 text-white px-2 py-1 rounded-md mr-2'
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>
                <button
                  className='bg-red-500 text-white px-2 py-1 rounded-md'
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllInfo;