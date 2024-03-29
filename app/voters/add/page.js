"use client";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSession} from 'next-auth/react';
import Link from "next/link";

const Page = () => {
  const [isLoading, setLoading] = useState(true);
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [mobile, setmobile] = useState("");
  const [prec_num, setprec_num] = useState("");
  const [memberYes, setmemberYes] = useState(0);
  const [purok, setpurok] = useState("");
  const [member, setmember] = useState("");
  const [datalist, setdatalist] = useState([]);
  const { data: session, status } = useSession();


  const router = useRouter()



  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // Redirect to homepage if user is not logged in

    } else {

        FetchData()

    }

  }, [status, router]);



  async function FetchData() {
    try {
    const { data } = await axios.get(process.env.LOCAL_URL + `/api/purok`)
    setdatalist(data);


  } catch (error) {

    console.error(error);

  } finally {
    setLoading(false)
  }
         
}




function memberChange(e) {
      e.preventDefault();
  setmember(e.target.value)

  if (e.target.value === 'Yes') {
    setmemberYes(1)
  } else {
    setmemberYes(0)

  }

}




  const addVoter = async (e) => {

    e.preventDefault()

    setLoading(true)

    try {

      const payload = {fname,lname, mobile, prec_num, purok, member,memberYes };

      const response = await axios.post(process.env.LOCAL_URL + '/api/voter',payload);

      
      if (response.status === 200) {

        alert(response.data)

        console.log(payload)

        router.push('/voters'); 

      } else {
        // Handle unexpected response status codes
        console.error('Unexpected response status:', response.status);
      }

    } catch (error) {

      setLoading(false);

    } finally {

      setLoading(false);
       // Set isLoading to false when the request is completed or encounters an error
    }
  };

  if (isLoading) {
    
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
        <p className="mt-4">Loading...</p>
      </div>
      </div>
    );
  }

  return (
    <div className="flex-row w-full ">

<div className="flex flex-col sm:flex-row w-full justify-end m-2">

<Link href="/voters" className="black_btn">Cancel</Link>
</div>


 <div className=" m-4 bg-gray-50 p-4 rounded-lg">
        <form onSubmit={addVoter}>
          <div className="grid md:grid-cols-2 md:gap-6">
           
          <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                value={fname}
                onChange={(e) => setfname(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label               
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First name
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                value={lname}
                onChange={(e) => setlname(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label               
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last name
              </label>
            </div>

           
          </div>




          <div className="grid md:grid-cols-2 md:gap-6">
         
          <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                value={mobile}
                onChange={(e) => setmobile(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
               
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Mobile
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                value={prec_num}
                onChange={(e) => setprec_num(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label               
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Precinct Number
              </label>
            </div>
        
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">

          <div className="relative z-0 w-full mb-6 group">
             
             <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Select Purok</label>
 
           <select value={purok} required onChange={(e) => setpurok(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
             <option value=''>Select Purok</option>
           {datalist.map((item,i)=> (
             <option key={i} value={item.PName}>{item.PName}</option>
           ))}
 
           </select>
 
 
             </div>

           
          <div className="relative z-0 w-full mb-6 group">

            <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Member Type</label>

              <select value={member}  required onChange={memberChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
             
              <option value=''>Select</option>
              <option value={'Yes'}>Yes</option>
              <option value={'No'}>No</option>

             </select>
             
            </div>



       

            </div>

            
          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
