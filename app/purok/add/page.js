'use client'
import axios from "axios";
import React, { useState } from "react";

const Page = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [pname, setpname] = useState('');
  const [coordinator, setcoordinator] = useState('');
  const [phone, setphone] = useState('');
  const [totalVote, settotalVote] = useState(0);
  const [redBox, setredBox] = useState(0);
  const [blueBox, setblueBox] = useState(0);
  const [greenBox, setgreenBox] = useState(0);

  const addPurok = async () => {
    try {
      setIsLoading(true); // Set isLoading to true when the request is initiated

      const payload = {
        PName: pname,
        Coordinator: coordinator,
        Phone: phone,
        totalVote: totalVote,
        RedBox:redBox,
        BlueBox:blueBox,
        GreenBox:greenBox
      };

      const response = await axios.post(process.env.LOCAL_URL + '/api/purok', payload);
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
        <h1 className="text-2xl font-bold mb-6">Purok Information</h1>
        <form onSubmit={addPurok} className="space-y-4">
          <div>
            <label className="block mb-1">Purok Name:</label>
            <input
              type="text"
              value={pname}
              onChange={(e) => setpname(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Coordinator:</label>
            <input
              type="text"
              value={coordinator}
              onChange={(e) => setcoordinator(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Phone #:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Total Vote</label>
            <input
              type="text"
              value={totalVote}
              onChange={(e) => settotalVote(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
         
          <div>
            <label className="block mb-1">RedBox</label>
            <input
              type="text"
              value={redBox}
              onChange={(e) => setredBox(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">BlueBox</label>
            <input
              type="text"
              value={blueBox}
              onChange={(e) => setblueBox(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">GreenBox</label>
            <input
              type="text"
              value={greenBox}
              onChange={(e) => setgreenBox(e.target.value)}
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
