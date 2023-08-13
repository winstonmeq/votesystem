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
                const { data } = await axios.get(process.env.LOCAL_URL + `/api/purok`)
                setdatalist(data);
                setLoading(false);

                console.log(data)

              } catch (error) {

                console.error(error);
                setLoading(false);

              }
                    
            }
 
    FetchData();

    }, []);

    if (loading) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
          <p className="mt-4">Loading...</p>
        </div>
        </div>


      )
    
    }



  return (
    <div className="flex flex-col h-screen">
    <div className="flex justify-between  bg-blue-500 text-white py-4 px-6">
      <h1 className="text-2xl font-bold">Purok List</h1>
      <Link href="/purok/add">
        <div className="text-white font-semibold hover:underline">Add Purok</div>
      </Link>
    </div>
    <div className="flex justify-center ">
      <div className=" m-6 max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 font-bold">Purok Name</th>
              <th className="px-4 py-2 font-bold">Coordinator Name</th>
              <th className="px-4 py-2 font-bold">Total Vote</th>
              <th className="px-4 py-2 font-bold">Red Box</th>
              <th className="px-4 py-2 font-bold">Blue Box</th>
              <th className="px-4 py-2 font-bold">Green Box</th>
            </tr>
          </thead>
          <tbody>
            {datalist.map((item, i) => (
              <tr key={i}>
                <td className="px-4 py-2">{item.PName}</td>
                <td className="px-4 py-2">{item.Coordinator}</td>
                <td className="px-4 py-2">{item.totalVote}</td>
                <td className="px-4 py-2">{item.RedBox}</td>
                <td className="px-4 py-2">{item.BlueBox}</td>
                <td className="px-4 py-2">{item.GreenBox}</td>
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