"use client";
import React, { useState } from 'react';
import InfoTbl from './infoTbl/page';
import AllInfo from './infoTbl/allInfo/page';

export default function Page() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState([]);
  

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = { name, email };

    try {
      const res = await fetch("http://localhost:3000/api/postApi", {
        method: "POST",
        body: JSON.stringify(submitData),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }

    // Create a new data object with a unique ID
    const newData = {
      // id: id,
      name: name,
      email: email,
    };
    // Update the data array
    setData((prevData) => [...prevData, newData]);
    // Clear the input fields
    setName("");
    setEmail("");
  };

  return (
    <div className='m-8 p-8'>
      <h1 className='m-8 flex justify-center'>CRUD Operation </h1>
      <hr />
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
      <InfoTbl data={data} />
      <hr />
      <br />
      <br />
      <hr />
      <hr />
      <br />
      <br />
      <hr />
      <hr />
      <AllInfo />
    </div>
  );
}