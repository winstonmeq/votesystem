'use client'
import axios from "axios";
import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const Page = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [pname, setpname] = useState('');
  const [coordinator, setcoordinator] = useState('');
  const [phone, setphone] = useState('');
  const [totalVote, settotalVote] = useState(0);
  const { data: session, status } = useSession();

  const router = useRouter();


  useEffect(() => {
    if (status === "unauthenticated") {
        window.location.href = "/"; // Redirect to homepage if user is not logged in
    }
  }, [status, router]);




  const addPurok = async (e) => {

    e.preventDefault()

    setIsLoading(true);

    try {
       // Set isLoading to true when the request is initiated

      const payload = {
        PName: pname,
        Coordinator: coordinator,
        Phone: phone,
        totalVote: totalVote,
     
      };

      const response = await axios.post(process.env.LOCAL_URL + '/api/purok', payload);

      if (response.status === 200) {

        alert(response.data)

        console.log(payload)

        router.push('/purok'); 

      } else {
        // Handle unexpected response status codes
        console.error('Unexpected response status:', response.status);
      }

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
   
    <div className="flex flex-row w-full justify-center h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Purok Information</h1>
        <form onSubmit={addPurok} className="space-y-4">
          <div>
            <label className="block mb-1">Purok Name:</label>
            <input
              type="text"
              value={pname}
              required
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
         
        
          <button
            type="submit"
            className="w-full black_btn"
          >
            Add
          </button>
        
        </form>
        <Link href="/purok">
        <button
            type="submit"
            className="w-full black_btn mt-2"
          >
            Cancel
          </button></Link>
      </div>
    
    
    {/* <button type="submit" onClick={addUser} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Save'}
    </button> */}
  </div>
  );
};

export default Page;
