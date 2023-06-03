'use client'
import axios from "axios";
import React, { useState } from "react";

const Page = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [age, setage] = useState('');
  const [position, setposition] = useState('');
  const [prec_num, setprec_num] = useState('');
  const [purok, setpurok] = useState('');
  const [member, setmember] = useState(0);

  const addVoter = async () => {

    try {

      setIsLoading(true); // Set isLoading to true when the request is initiated

      const payload = {
        fname: fname,
        lname: lname,
        age: age,
        position: position,
        prec_num:prec_num,
        purok:purok,
        member:member
      };

      const response = await axios.post('http://localhost:3000/api/voter', payload);

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
        <h1 className="text-2xl font-bold mb-6">Voters Information</h1>
        <form onSubmit={addVoter} className="space-y-4">
          <div>
            <label className="block mb-1">First Name:</label>
            <input
              type="text"
              value={fname}
              onChange={(e) => setfname(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Last Name</label>
            <input
              type="text"
              value={lname}
              onChange={(e) => setlname(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Age</label>
            <input
              type="text"
              value={age}
              onChange={(e) => setage(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Position</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setposition(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
         
          <div>
            <label className="block mb-1">Precinct Number</label>
            <input
              type="text"
              value={prec_num}
              onChange={(e) => setprec_num(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Purok</label>
            <input
              type="text"
              value={purok}
              onChange={(e) => setpurok(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Member</label>
            <input
              type="text"
              value={member}
              onChange={(e) => setmember(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
       
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </form>
      </div>
    
    
    {/* <button type="submit" onClick={addVoter} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Save'}
    </button> */}
  </div>
  );
};

export default Page;
