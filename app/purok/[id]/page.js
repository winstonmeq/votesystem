'use client'
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import DataTable from "react-data-table-component";
import { useRouter } from 'next/navigation';
import { useSession} from 'next-auth/react';

const Page = ({ params: { id } }) => {

  const [datalist, setdatalist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pname, setpname] = useState('');
  const [coordinator, setcoordinator] = useState('');
  const [phone, setphone] = useState('');
  const [totalVote, settotalVote] = useState(0);

  const { data: session, status } = useSession();
  const router = useRouter()



  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // Redirect to homepage if user is not logged in
    }
  }, [status, router]);



  useEffect(() => {

    async function FetchData() {
      try {
        const { data } = await axios.get(process.env.LOCAL_URL + `/api/purok/${id}`)

        setdatalist(data);     
        
        
      
      if (data.length > 0) {
        setpname(data[0].PName);
        setcoordinator(data[0].Coordinator);
        setphone(data[0].Phone);
        settotalVote(data[0].totalVote);
      }



      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    FetchData();
  }, [id]);



  const updatePurok = async (e) => {

    e.preventDefault();

    try {
        const payload = {
            PName: pname,
            Coordinator: coordinator,
            Phone: phone,
            totalVote: totalVote,
         
          };

      const response = await axios.patch(
        process.env.LOCAL_URL + `/api/purok/${id}`,
        payload
      );

      if (response.status === 200) {

        alert(response.data);

        router.push('/purok'); 
        
      }


    } catch (error) {

        setLoading(false);
        console.error('Error in updating data:', error);


    } finally {

      setLoading(false);

    }


  };





  if (loading) {
    
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
        <p className="mt-4">Loading...</p>
      </div>
      </div>
    );
  }


  return (
    <div className="flex flex-row w-full justify-center h-screen">
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6">Purok Information</h1>
      <form onSubmit={updatePurok} className="space-y-4">
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
          Update
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

  )
}

export default Page