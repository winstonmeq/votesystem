'use client'
import axios from "axios";
import React, { useState } from "react";

const Page = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const [address, setAddress] = useState('');


  const addUser = async () => {
    try {
      setIsLoading(true); // Set isLoading to true when the request is initiated

      const payload = {
        fname: firstName,
        lname: lastName,
        position: position,
        address: address
      };

      const response = await axios.post('https://vms-green.vercel.app/api/users', payload);
      setIsLoading(false);
      console.log(response);

    } catch (error) {
      setIsLoading(false);
      console.log('error');
    } finally {
      setIsLoading(false); // Set isLoading to false when the request is completed or encounters an error
    }
  };


  if (isLoading) {
    return <div className="flex justify-center min-h-screen">Loading...</div>;
  }



  return (
   
    <div className="flex justify-center h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Person Data</h1>
        <form onSubmit={addUser} className="space-y-4">
          <div>
            <label className="block mb-1">First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Position:</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    
    
    {/* <button type="submit" onClick={addUser} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Save'}
    </button> */}
  </div>
  );
};

export default Page;
