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


"use client";
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
      </table># CRUD-Oprations
