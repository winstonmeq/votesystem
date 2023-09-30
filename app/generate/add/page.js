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
  const [datalistStore, setdatalistStore] = useState([]);
  const [datalistDistribution, setdatalistDistribution] = useState([]);


  const [loading, setLoading] = useState(true);

  const [distribution_name, setdistribution_name] = useState("");
  const [distributionId,setdistributionId] = useState("")
  const [purok_id, setpurok_id] = useState("");
  const [storeId, setstoreId] = useState("");


  const { data: session, status } = useSession();


  const router = useRouter()


  useEffect(() => {
        
    const fetchDataAndCheckAdmin = async () => {
      try {
        if (!session || !session.user.isAdmin) {
          router.push('/');
        } else {
          setLoading(true)
          FetchStore();
          FetchDistribution();
          FetchPurok(); 
          // Fetch data after admin check
        }
      } catch (error) {

        console.error('Error checking admin privileges:', error);

      } finally {

        setLoading(false)

      }
      
      

    };

    fetchDataAndCheckAdmin();
    }, [session,router]);
  


   const FetchDistribution = async () => {
    
      try {
        const { data } = await axios.get(
          process.env.LOCAL_URL + `/api/distribution`
        );

   
        if (data.length > 0 )  {

            setdatalistDistribution(data)
           
          }

        
      } catch (error) {
        console.error(error);
      }

     

    }

  const FetchPurok = async () =>  {
    
      try {
        const { data } = await axios.get(process.env.LOCAL_URL + '/api/purok');
        setdatalist2(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }

    }


    const FetchStore = async () =>  {


      try {
        const { data } = await axios.get(process.env.LOCAL_URL + '/api/store');
        setdatalistStore(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }

    }



     const generateData = async (e) => {

      e.preventDefault();

      // setLoading(true); // Set isLoading to true when the request is initiated
    
      try {
        const payload = { distributionId, storeId, purok_id };
    
        // pass data to generate qrcode data
        const response = await axios.post(
          process.env.LOCAL_URL + '/api/generate',
          payload
        );
    

        if (response.status === 200) {

          alert(response.data)
  
          console.log(payload)
  
          router.push('/generate'); 
  
        } else {
          // Handle unexpected response status codes
          console.error('Unexpected response status:', response.status);
        }
        // After successful update, navigate back to the previous page
     

      } catch (error) {

        console.error('Error in generating data:', error);

      } finally {

        // setLoading(false); // Set isLoading to false when the request is completed or encounters an error

      }
    };






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
    <div className="flex flex-row w-full justify-between m-2">
    <div className="flex flex-col font-bold">Generate Data</div>
    <div className="flex flex-col sm:flex-row">
    <Link href="/distribution" className="black_btn">Cancel</Link>
</div>
</div>

    
      <div className="m-2 bg-gray-50 p-2 rounded-lg">
        <form onSubmit={generateData}>
                 <div className="grid md:grid-cols-2 md:gap-6">         
           

          <div className="relative z-0 w-full mb-6 group">
              <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                Select Distribution
              </label>

              <select
               value={distributionId}
               required
                onChange={(e) => setdistributionId(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
              <option value={''}>Select</option>
                {datalistDistribution.map((item, i) => (                 
                  <option key={i} value={item._id}>
                    {item.distribution_name}
                  </option>
                ))}
              </select>
            </div>



            <div className="relative z-0 w-full mb-6 group">
              <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                Select Purok
              </label>

              <select
                value={purok_id}
                required
                onChange={(e) => setpurok_id(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
              <option value={''}>Select</option>
                {datalist2.map((item, i) => (                 
                  <option key={i} value={item.PName}>
                    {item.PName}
                  </option>
                ))}
              </select>
            </div>


            <div className="relative z-0 w-full mb-6 group">
              <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                Select Store
              </label>

              <select
                value={storeId}
                required
                onChange={(e) => setstoreId(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
              <option value={''}>Select</option>
                {datalistStore.map((item, i) => (
                 
                  <option key={i} value={item._id}>
                    {item.store_name}
                  </option>
                ))}
              </select>
            </div>

          </div>

        
          <button type="submit" className="black_btn">Generate Data</button>      

        
        </form>

       
      </div>
     
    </div>
  );
};

export default Page;
