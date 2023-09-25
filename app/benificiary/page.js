"use client";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from "next/navigation";




const Page = () => {


  const [datalist, setdatalist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session} = useSession();
  const router = useRouter();

  

  useEffect(() => {
        
    const fetchDataAndCheckAdmin = async () => {
      try {
        if (!session || !session.user.isAdmin) {
          router.push('/');
        } else {
          console.log('successfully logged in');
          fetchData(); // Fetch data after admin check
        }
      } catch (error) {
        console.error('Error checking admin privileges:', error);
      }  
    };

    fetchDataAndCheckAdmin();
    
    }, [session,router]);
  




    const fetchData = async () => {


      try {
        const { data } = await axios.get(process.env.LOCAL_URL + '/api/benificiary');
        setdatalist(data);
      } catch (error) {
        console.error('Error fetching store data:', error);
      } finally {
        setLoading(false);
      }
    };



    const addRecipient = async (e) => {

        e.preventDefault();
    
    
        try {
          
        const payload = {
          distribution_name:'sample', voter_name:'winston me', rec_status:'readyy', active:'yes',
        };
         
          const response = await axios.post(
            process.env.LOCAL_URL + '/api/benificiary',payload
          );
    
          if (response.status === 200) {
    
            alert(response.data)
    
            console.log(payload)
    
            router.push('/benificiary'); 
    
          } else {
            // Handle unexpected response status codes
            console.error('Unexpected response status:', response.status);
          }
    
         
        } catch (error) {
    
          console.error('Error:', error);
          setIsLoading(false);
    
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


 
  const columns = [
    {
      name: "Distribution",
      selector: (row) => (
        <div className="justify-center text-sm">{row.distribution_name}</div>
      ),
       
    },

    {
        name: "Name",
        selector: (row) => row.voter_name,
      },
    
      {
        name: "Municipality",
        selector: (row) => row.municipality,
      },

      {
        name: "Barangay",
        selector: (row) => row.barangay,
      },

    {
        name: "Active",
        selector: (row) => row.active,
      },
       

    {
      name: "Status",
      selector: (row) => row.rec_status,
    },
     

    // {
    //   name: "Action",
    //   selector: (row) => (
    //     <div className="w-100 transform hover:text-purple-500 hover:scale-110">
    //      <button className="rounded p-2 bg-red-600"><Link href={`/distribution/${row._id}`}>Generate </Link></button> 
          
    //     </div>
        
    //   ),
    // },
  ];

  return (
    <div className="flex-row w-full">




<div className="w-full">

<DataTable
            columns={columns}
            data={datalist}
            title="Benificiary Lists"
            defaultSortFieldId="createdAt"
            pagination
            paginationPerpage={datalist.length}
          />
</div>

        
      
    </div>
  );
};

export default Page;
