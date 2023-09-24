"use client";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useSession, getSession } from 'next-auth/react';
import { fetchData } from "next-auth/client/_utils";




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
          process.env.LOCAL_URL + `/api/recipient/${id}`
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
    
    
        Recipient page lng nih... para sa id..
     
    </div>
  );
};

export default Page;
