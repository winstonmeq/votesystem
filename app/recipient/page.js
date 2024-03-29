"use client";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import {useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";




const Page = () => {


  const [datalist, setdatalist] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session } = useSession()

  

  useEffect(() => {
        
    const fetchDataAndCheckAdmin = async () => {
      try {
        if (!session || !session.user.isAdmin) {
          router.push('/');
        } else {
          console.log('successfully logged in: ');
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
        const { data } = await axios.get(process.env.LOCAL_URL + '/api/recipient');
        setdatalist(data);
      } catch (error) {
        console.error('Error fetching store data:', error);
      } finally {
        setLoading(false);
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
      name: "Activity",
      selector: (row) => (
        <div className="justify-center text-sm">{row.distribution_name}</div>
      ),
       
    },

    {
      name: "Voter Name",
      selector: (row) => (
        <div className="justify-center text-sm">{row.voter_name}</div>
      ),
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
      selector: (row) => row.status,
    },
     
     

    // {
    //   name: "Action",
    //   selector: (row) => (
    //     <div className="w-100 transform hover:text-purple-500 hover:scale-110">
    //      <button className="rounded p-2 bg-red-600"><Link href={`/recipient/${row._id}`}>Edit </Link></button> 
          
    //     </div>
        
    //   ),
    // },
  ];

  return (
    <div className="flex-row w-full">

   {console.log('data sa recipient:', datalist)}


<div className="w-full">

<DataTable
            columns={columns}
            data={datalist}
            title="Recipient Lists"
            defaultSortFieldId="createdAt"
            pagination
            paginationPerpage={datalist.length}
          />
</div>

        
      
    </div>
  );
};

export default Page;
