'use client'
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';



const Page = () => {

  const [datalist, setdatalist] = useState([]);    
  const [loading, setLoading] = useState(true);


  useEffect(() => {   

    async function FetchData() {
      try {
      const { data } = await axios.get(`http://localhost:3000/api/users`)
      setdatalist(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
           
  }
 
    FetchData();
    }, []);

    if (loading) {
      return <div className="flex justify-center min-h-screen ">Loading...</div>;
    }



  return (
    <div className="flex flex-col h-screen">
    <div className="flex justify-between  bg-blue-500 text-white py-4 px-6">
      <h1 className="text-2xl font-bold">User List</h1>
      <Link href="/users/add">
        <div className="text-white font-semibold hover:underline">Add User</div>
      </Link>
    </div>
    <div className="flex justify-center ">
      <div className=" m-6 max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 font-bold">First Name</th>
              <th className="px-4 py-2 font-bold">Last Name</th>
            </tr>
          </thead>
          <tbody>
            {datalist.map((item, i) => (
              <tr key={i}>
                <td className="px-4 py-2">{item.fname}</td>
                <td className="px-4 py-2">{item.lname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
    
  )
}

export default Page