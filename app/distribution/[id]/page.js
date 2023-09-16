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

  const [distribution_name, setdistribution_name] = useState("");
  const [purok_id, setpurok_id] = useState("");


  const { data: session, status } = useSession();


  const router = useRouter()


  useEffect(() => {
        
    const fetchDataAndCheckAdmin = async () => {
      try {
        if (!session || !session.user.isAdmin) {
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
    }, [session,router]);
  


   const FetchData = async () => {
      try {
        const { data } = await axios.get(
          process.env.LOCAL_URL + `/api/distribution/${id}`
        );

   
        if (data.length > 0 && data[0].distribution_name) {
            setdistribution_name(data[0].distribution_name);
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

     const generateData = async (e) => {

      e.preventDefault();

      setLoading(true); // Set isLoading to true when the request is initiated
    
      try {
        const payload = { id, purok_id, distribution_name };
    
        // pass data to generate qrcode data
        const response = await axios.post(
          process.env.LOCAL_URL + '/api/distribution/generate',
          payload
        );
    
        // After successful update, navigate back to the previous page
        router.back();

      } catch (error) {

        console.error('Error in generating data:', error);

      } finally {

        setLoading(false); // Set isLoading to false when the request is completed or encounters an error

      }
    };













    // const updateVoter = async () => {
    //   setLoading(true); // Set isLoading to true when the request is initiated
    
    //   try {
    //     const payload = { fname, lname, age, position, prec_num, purok, member };
    
    //     // Make a PATCH request to update the voter's data
    //     const response = await axios.patch(
    //       process.env.LOCAL_URL + `/api/voter/${id}`,
    //       payload
    //     );
    
    //     // After successful update, navigate back to the previous page
    //     router.back();
    //   } catch (error) {
    //     console.error('Error in updating data:', error);
    //   } finally {
    //     setLoading(false); // Set isLoading to false when the request is completed or encounters an error
    //   }
    // };

  

  
//   const deleteVoter = async () => {
   
//     setLoading(true); // Set isLoading to true when the request is initiated

//     try {

//       const response = await axios.delete(process.env.LOCAL_URL + `/api/voter/${id}`);

//       router.push('/voters')       
        

//     } catch (error) {
//       console.error('unable to delete data')
//     } finally {
//       setLoading(false); // Set isLoading to false when the request is completed or encounters an error
//     }

//   };


//   function deleteVoter2() {
//     var result = window.confirm("Are you sure you want to delete?")

//     if(result) {
//         deleteVoter()
//         alert('Voter deleted!')
//     }else {
//       alert('Delete canceled')
//     }
//   }




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
    
    
      <div className="m-2 bg-gray-50 p-2 rounded-lg">
        <form onSubmit={''}>
       
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

       
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">         
           

            <div className="relative z-0 w-full mb-6 group">
              <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                Select Purok
              </label>

              <select
                value={purok_id}
                onChange={(e) => setpurok_id(e.target.value)}
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

        
         
        
        </form>

        <button onClick={generateData} className="black_btn">Generate Data</button>      
       
      </div>
     
    </div>
  );
};

export default Page;
