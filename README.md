This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


<!-- "use client";
import React, { useState } from 'react';
import InfoTbl from './infoTbl/page';

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

    // Clear the input fields
    setName("");
    setEmail("");
  };

  return (
    <div>
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
    </div>
  );
}





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
      </table># CRUD-Oprations -->



<!-- home page..............

"use client";
import React, { useState } from 'react';
import InfoTbl from './infoTbl/page';
import AllInfo from './infoTbl/allInfo/page';

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
         console.log("jjjjjjj",data.user.id)
      } else {
        console.error("Failed to fetch user data:", res.status, res.statusText);
      }
      
    } catch (error) {
      console.log(error);
    }
    console.log("5555555",realid)

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
      console.log ("########################",selectedUserData)
      console.log ("111111111",data)
      const response = await fetch('http://localhost:3000/api/updateApi',{
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
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
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

</div>
  );
}


info table................


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


alll info..................

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

export default AllInfo; -->




<!-- post router.........
// /api/user/add-user
import { PrismaClient} from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

  
// Handles POST requests to /api
export async function POST(request) {
    const body = await request.json();

    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email
          },
    });

    console.log('user created:', user);

    
    return NextResponse.json({ user });
} -->