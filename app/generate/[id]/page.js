

"use client";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";






const Page = ({ params: { id } }) => {
  const [Loading, setLoading] = useState(false);
  const [distribution_name, setdistribution_name] = useState("");
  const [store_name, setstore_name] = useState("");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [purok, setpurok] = useState("");
  const [date, setdate] = useState("");
  const [active, setactive] = useState("hhhhh");
  const [status, setstatus] = useState("oooooo");

  const [datalist, setdatalist] = useState([]);

  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
        
    const fetchDataAndCheckAdmin = async () => {
      try {
        if (!session || !session.user.isAdmin) {
          router.push('/');
        } else {
          console.log('successfully logged in');
          FetchGenerate();
        }
      } catch (error) {
        console.error('Error checking admin privileges:', error);
      }  
    };

    fetchDataAndCheckAdmin();
    }, [session,router]);
  




  const FetchGenerate = async () => {
    try {
      const { data } = await axios.get(
        process.env.LOCAL_URL + `/api/generate/${id}`
      );


      console.log('store data', data)

      
      if (data.length > 0) {
        setdistribution_name(data[0].distribution_name);
        setstore_name(data[0].store_name);
        setfname(data[0].voter_fname);
        setlname(data[0].voter_lname);
        setpurok(data[0].barangay);
        setstatus(data[0].status);
        setactive(data[0].active);
      }

      
    } catch (error) {
      console.error(error);
    }

   

  }



  const updateGenerate = async (e) => {

    e.preventDefault();

    try {
      const payload = {
        active,
      };

      const response = await axios.patch(
        process.env.LOCAL_URL + `/api/generate/${id}`,
        payload
      );

      if (response.status === 200) {

        alert(response.data);

        console.log(payload)

        router.push('/generate'); 
        
      }


    } catch (error) {

        setLoading(false);
        console.error('Error in updating data:', error);


    } finally {

      setLoading(false);

    }


  };

 

  if (Loading) {
    return (
      <div classNameName="flex justify-center min-h-screen">Loading...</div>
    );
  }

  return (
    <div className="flex-row w-full ">

<div className="flex flex-col sm:flex-row w-full justify-between m-2">
<div className="text-2xl">Edit Generate Data</div>
<Link href="/generate" className="black_btn">Cancel</Link>

</div>



      <div className=" m-4 bg-gray-50 p-4 rounded-lg">
        <form onSubmit={updateGenerate}>
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
                value={store_name}
                onChange={(e) => store_name(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Store Name
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-3 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                value={fname}
                onChange={(e) => setfname(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Firstname
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
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Lastname
              </label>
            </div>
          
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                value={purok}
                onChange={(e) => setpurok(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Purok
              </label>
            </div>

            
          </div>

          <div className="grid md:grid-cols-3 md:gap-6">
           

            <div className="relative z-0 w-full mb-6 group">
              <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                Status
              </label>

              <select
                value={status}
                onChange={(e) => setstatus(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value=''>Select</option>
                <option value={"ready"}>ready</option>
                <option value={"received"}>received</option>
              </select>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                Active Type
              </label>

              <select
                value={active}
                onChange={(e) => setactive(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value=''>Select</option>
                <option value={"Yes"}>Yes</option>
                <option value={"No"}>No</option>
              </select>
            </div>

          </div>

      
          


          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update
          </button>

     
        </form>
      </div>
    </div>
  );
};

export default Page;
