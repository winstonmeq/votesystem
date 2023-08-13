"use client";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useSession, getSession } from 'next-auth/react';




const Page = ({ params: { id } }) => {

  const [datalist2, setdatalist2] = useState([]);

  const [loading, setLoading] = useState(true);

  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [age, setage] = useState("");
  const [position, setposition] = useState("");
  const [prec_num, setprec_num] = useState("");
  const [purok, setpurok] = useState("");
  const [member, setmember] = useState(0);
  const { data: session, status } = useSession();


  const router = useRouter()


  useEffect(() => {
        
    const fetchDataAndCheckAdmin = async () => {
      try {
        const session = await getSession();
        if (!session || !session.user || !session.user.isAdmin) {
          router.push('/');
        } else {
          console.log('successfully logged in');
          FetchData();
          FetchData2(); // Fetch data after admin check
        }
      } catch (error) {
        console.error('Error checking admin privileges:', error);
      }  
    };

    fetchDataAndCheckAdmin();
    }, [router]);
  


   const FetchData = async () => {
      try {
        const { data } = await axios.get(
          process.env.LOCAL_URL + `/api/voter/${id}`
        );

   
        if (data.length > 0) {
          setfname(data[0].fname);
          setlname(data[0].lname);
          setage(data[0].age);
          setposition(data[0].position);
          setprec_num(data[0].prec_num);
          setpurok(data[0].purok);
          setmember(data[0].member);
        }

        
      } catch (error) {
        console.error(error);
      }

     

    }

  const FetchData2 = async () =>  {
      try {
        const { data } = await axios.get(process.env.LOCAL_URL + `/api/purok`);
        setdatalist2(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }


    }


    const updateVoter = async () => {
      setLoading(true); // Set isLoading to true when the request is initiated
    
      try {
        const payload = { fname, lname, age, position, prec_num, purok, member };
    
        // Make a PATCH request to update the voter's data
        const response = await axios.patch(
          process.env.LOCAL_URL + `/api/voter/${id}`,
          payload
        );
    
        // After successful update, navigate back to the previous page
        router.back();
      } catch (error) {
        console.error('Error in updating data:', error);
      } finally {
        setLoading(false); // Set isLoading to false when the request is completed or encounters an error
      }
    };

  

  
  const deleteVoter = async () => {
   
    setLoading(true); // Set isLoading to true when the request is initiated

    try {

      const response = await axios.delete(process.env.LOCAL_URL + `/api/voter/${id}`);

      router.push('/voters')       
        

    } catch (error) {
      console.error('unable to delete data')
    } finally {
      setLoading(false); // Set isLoading to false when the request is completed or encounters an error
    }

  };


  function deleteVoter2() {
    var result = window.confirm("Are you sure you want to delete?")

    if(result) {
        deleteVoter()
        alert('Voter deleted!')
    }else {
      alert('Delete canceled')
    }
  }




  if (loading) {
    
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
    
    <div className="flex-row w-full justify-center">
    
    <div className="flex  w-full justify-end">    
    <button
            type="submit" onClick={deleteVoter2}>X</button>
    </div>
      <div className="m-2 bg-gray-50 p-2 rounded-lg">
        <form onSubmit={updateVoter}>
       
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
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
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
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Last name
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                value={age}
                onChange={(e) => setage(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Age
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                value={position}
                onChange={(e) => setposition(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Position
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
          
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                value={prec_num}
                onChange={(e) => setprec_num(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Precinct Number
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                Select Purok
              </label>

              <select
                value={purok}
                onChange={(e) => setpurok(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {datalist2.map((item, i) => (
                  <option key={i} value={item.PName}>
                    {item.PName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                Member Type
              </label>

              <select
                value={member}
                onChange={(e) => setmember(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
            </div>
          </div>
         
         <div className=" flex justify-between">
         <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update
          </button>

         
        


         </div>
        </form>

      
       
      </div>
     
    </div>
  );
};

export default Page;
