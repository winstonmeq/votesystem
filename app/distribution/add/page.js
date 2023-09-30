"use client";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [distribution_name, setdistribution_name] = useState("");
  const [type, settype] = useState("");
  const [target, settarget] = useState(0);

  const [active, setactive] = useState("");

  const [datalist, setdatalist] = useState([]);

  const { data: session, status } = useSession();

  const router = useRouter();


  useEffect(() => {
    if (status === "unauthenticated") {
        router.push('/') // Redirect to homepage if user is not logged in
    }
  }, [status, router]);



  const addDistribution = async (e) => {

    e.preventDefault();


    try {
      
    const payload = {
      distribution_name, type, target, active,
    };
     
      const response = await axios.post(
        process.env.LOCAL_URL + '/api/distribution',payload
      );

      if (response.status === 200) {

        alert(response.data)

        console.log(payload)

        router.push('/distribution'); 

      } else {
        // Handle unexpected response status codes
        console.error('Unexpected response status:', response.status);
      }

     
    } catch (error) {

      console.error('Error:', error);
      setIsLoading(false);

    } 

  };

 

  if (isLoading) {
    return (
      <div classNameName="flex justify-center min-h-screen">Loading...</div>
    );
  }

  return (
    <div className="flex-row w-full ">
       <div className="flex flex-col sm:flex-row w-full justify-end m-2">

<Link href="/distribution" className="black_btn">Cancel</Link>

</div>

 <div className=" m-4 bg-gray-50 p-4 rounded-lg">
        <form onSubmit={addDistribution}>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                value={distribution_name}
                onChange={(e) => setdistribution_name(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Distribution Name
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                value={type}
                onChange={(e) => settype(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Type
              </label>
            </div>

            
          

          </div>

          
        
          <div className="grid md:grid-cols-3 md:gap-6">

         
            <div className="relative z-0 w-full mb-6 group">
              <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                Target
              </label>

              <select
                required
                value={target}
                onChange={(e) => settarget(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={"10"}>10</option>
                <option value={"50"}>50</option>
                <option value={"100"}>100</option>
                <option value={"200"}>200</option>
                <option value={"300"}>300</option>

              </select>
            </div>


            <div className="relative z-0 w-full mb-6 group">
              <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                Active
              </label>

              <select
                required
                value={active}
                onChange={(e) => setactive(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={""}>Select</option>
                <option value={"Yes"}>Yes</option>
                <option value={"No"}>No</option>
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
