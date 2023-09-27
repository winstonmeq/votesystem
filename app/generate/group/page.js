


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
  const { data: session } = useSession();
  const router = useRouter();

  

  useEffect(() => {
        
    const fetchDataAndCheckAdmin = async () => {
      try {
        if (!session || !session.user.isAdmin) {
          router.push('/');
        } else {
          console.log('successfully logged in');
          FetchData(); // Fetch data after admin check
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
          process.env.LOCAL_URL + '/api/generate/group'
        );

   
        if (data.length > 0) {
        
          setdatalist(data)
          setLoading(false);
        }

        
      } catch (error) {

        console.error(error);

      } finally {
        setLoading(false);
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


 
  const columns = [
    {
      name: "Distribution",
      selector: (row) => (
        <div className="justify-center text-sm">{row.distribution_name}</div>
      ),
       
    },

    {
      name: "Target",
      selector: (row) => (
        <div className="justify-center text-sm">{row.count}</div>
      ),
       
    },
    {
      name: "Received",
      selector: (row) => (
        <div className="justify-center text-sm">{row.totalreceived}</div>
      ),
       
    },

     
  ];

  return (
    <div className="flex-row w-full">
    {console.log(datalist)}


    <div className="flex flex-col sm:flex-row w-full justify-between m-2">

<Link href="/store" className="black_btn">Back</Link>



</div>
<div className="w-full">

<DataTable
            columns={columns}
            data={datalist}
            title="Store Details"
            defaultSortFieldId="createdAt"
            pagination
            paginationPerpage={datalist.length}
          />


</div>

        
      
    </div>
  );
};

export default Page;
