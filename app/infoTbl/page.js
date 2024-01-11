import React, { useState, useEffect } from 'react';

export default function InfoTbl({ data, handleEditClick }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Update the users state when data prop changes
    setUsers(data);
  }, [data]);


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

  const handleEdit = (id) => {
    // Find the selected user by ID
    const userToEdit = users.find((user) => user.id === id);

    // Set the selected user in the state for editing
    setSelectedUser(userToEdit);
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
          {data.map((item) => (
            <tr key={item.id}>
              <td className='border px-4 py-2'>{item.name}</td>
              <td className='border px-4 py-2'>{item.email}</td>
              <td className='border px-4 py-2'>
                <button
                  className='bg-yellow-500 text-white px-2 py-1 rounded-md mr-2'
                  onClick={() => handleEditClick(item)}
                >
                  Edit
                </button>
                {/* <button
                  className='bg-red-500 text-white px-2 py-1 rounded-md'
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}