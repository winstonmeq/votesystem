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
  const { data: session, status } = useSession();
  const router = useRouter();

  

 



  useEffect(() => {
        
    // const fetchDataAndCheckAdmin = async () => {
    //   try {
    //     const session = await getSession();
    //     if (!session || !session.user || !session.user.isAdmin) {
    //       router.push('/');
    //     } else {
    //       console.log('successfully logged in');
    //       fetchData(); // Fetch data after admin check
    //     }
    //   } catch (error) {
    //     console.error('Error checking admin privileges:', error);
    //   }  
    // };

    // fetchDataAndCheckAdmin();

    fetchData();
    }, [router]);
  


    const fetchData = async () => {

     

      try {
        const { data } = await axios.get(process.env.LOCAL_URL + '/api/store');
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
      name: "Store",
      selector: (row) => (
        <div className="justify-center text-sm">{row.store_name}</div>
      ),
       
    },

    {
      name: "Owner",
      selector: (row) => (
        <div className="justify-center text-sm">{row.owner_name}</div>
      ),
    },

    {
      name: "Mobile",
      selector: (row) => row.mobile,
    },
    {
      name: "Barangay",
      selector: (row) => row.barangay,
    },

    {
        name: "Municipality",
        selector: (row) => row.municipality,
      },
  
    

    {
      name: "Action",
      selector: (row) => (
        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
          <Link href={`/store/${row._id}`}>{row._id}
           
          
          </Link>
          
        </div>
        
      ),
    },
  ];

  return (
    <div className="flex-row w-full">



<div className="flex flex-col sm:flex-row w-full justify-between m-2">

  <Link href="/store/add" className="black_btn">Add Store</Link>
  


</div>

<div className="w-full">

<DataTable
            columns={columns}
            data={datalist}
            title="Store Lists"
            defaultSortFieldId="createdAt"
            pagination
            paginationPerpage={datalist.length}
          />
</div>

        
      
    </div>
  );
};

export default Page;
