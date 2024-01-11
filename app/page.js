"use client";
import React, { useState } from 'react';
import InfoTbl from './infoTbl/page';
import AllInfo from './infoTbl/allInfo/page';
import Link from 'next/link';

export default function Page() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [realid, setRealid] = useState();
  const [id, setId] = useState();
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [updatePerformed, setUpdatePerformed] = useState(false);
  const [showInfoComponent, setShowInfoComponent] = useState(true);


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = { id, name, email };

    try {
      const res = await fetch("http://localhost:3000/api/postApi", {
        method: "POST",
        body: JSON.stringify(submitData),
        headers: {
          "Content-Type": "application/json",
        },

      });
      if (res.ok) {
        const data = await res.json(); // This extracts the JSON data from the response
        console.log("Received user data:", data.user);
        setRealid(data.user.id)
        console.log("jjjjjjj", data.user.id)
      } else {
        console.error("Failed to fetch user data:", res.status, res.statusText);
      }

    } catch (error) {
      console.log(error);
    }
    console.log("5555555", realid)

    // Create a new data object with a unique ID
    const newData = {
      id: realid,
      name: name,
      email: email,
    };
    // Update the data array
    setData((prevData) => [...prevData, newData]);
    // Clear the input fields
    setName("");
    setEmail("");
  };

  const handleEditClick = (userData) => {
    setSelectedUserData(userData);
    setEditMode(true);
    console.log(userData)
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setSelectedUserData(null);
  };

  const handleUpdate = async () => {
    // Use the selectedUserData state to update the user
    try {
      console.log("########################", selectedUserData)
      console.log("111111111", data)
      const response = await fetch('http://localhost:3000/api/updateApi', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: realid,
          name: selectedUserData.name,
          email: selectedUserData.email,
        }),
      });

      if (response.ok) {
        // Refresh the data after update

        // Set the updatePerformed to true
        setUpdatePerformed(true);

        // Hide the InfoTbl component
        setShowInfoComponent(false);

        // Clear the selected user state
        setEditMode(false);
        setSelectedUserData(null);
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };


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
        setData((prevData) =>
        prevData.map((item) =>
          item.id === realid ? { ...item, name: selectedUserData.name, email: selectedUserData.email } : item
        )
      );
    } else {
      console.error('Failed to update user');
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
};


  return (
    <div className='m-8 p-8'>
      <h1 className='m-8 flex justify-center'>CRUD Operation </h1>
      <hr />
      {editMode ? (
        <div>
          {/* <h2 className='text-xl font-semibold mb-2'>Edit User</h2> */}
          <label className='block'>
            Name:
            <input
              type='text'
              className='border border-gray-300 p-2 rounded-md w-full mt-1'
              value={selectedUserData.name}
              onChange={(e) => setSelectedUserData((prevUser) => ({ ...prevUser, name: e.target.value }))}
            />
          </label>
          <label className='block'>
            Email:
            <input
              type='text'
              className='border border-gray-300 p-2 rounded-md w-full mt-1'
              value={selectedUserData.email}
              onChange={(e) => setSelectedUserData((prevUser) => ({ ...prevUser, email: e.target.value }))}
            />
          </label>
          <button
            className='mt-2 bg-blue-500 text-white px-4 py-2 rounded-md'
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className='mt-2 bg-gray-500 text-white px-4 py-2 rounded-md ml-2'
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
        </div>
      ) : (
        // Display the create form when not in edit mode
        <form className='mt-8' onSubmit={handleSubmit}>
          <label className='block'>
            Name:
            <input
              type="text"
              className='border border-gray-300 p-2 rounded-md w-full mt-1'
              value={name}
              onChange={handleNameChange}
            />
          </label>

          <label className='block'>
            Your Email:
            <input
              type="text"
              className='border border-gray-300 p-2 rounded-md w-full mt-1'
              value={email}
              onChange={handleEmailChange}
            />
          </label>
          <button type="submit" className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-md'>
            Create
          </button>
        </form>
      )}

      {/* Only render InfoTbl if showInfoComponent is true */}
      {showInfoComponent && <InfoTbl data={data} handleEditClick={handleEditClick} />}

      {/* Only render AllInfo if updatePerformed is true */}
      {updatePerformed && <AllInfo handleEditClick={handleEditClick} />}



      <Link href="/infoTbl/allInfo">
        <div className=" bg-gray-500 text-white px-4 py-2 rounded-md flex justify-center mt-16">
          Go to All Info
        </div>
      </Link>


    </div>
  );
}