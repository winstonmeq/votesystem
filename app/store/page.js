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
  const [filteredData, setFilteredData] = useState([]);
  const [filterText, setFilterText] = useState('');
  

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
        const { data } = await axios.get(process.env.LOCAL_URL + '/api/store');
        setdatalist(data);
        setFilteredData(data)
      } catch (error) {
        console.error('Error fetching store data:', error);
      } finally {
        setLoading(false);
      }
    };



    const filterData = () => {
      const filtered = datalist.filter(item =>
        item.store_name.toLowerCase().includes(filterText.toLowerCase())
      );
      setFilteredData(filtered);
    };
  
    const clearFilter = () => {
      setFilterText('');
      setFilteredData(datalist);
    };


    const handleKeyPress = (e) => {
      // Check if the Enter key (key code 13) was pressed
      if (e.key === 'Enter') {
        // Call the search function when Enter is pressed
       filterData()
      }
    };
    




 
  const columns = [
    {
      name: "Store",
      selector: (row) => (
        <div className="justify-center font-bold text-sm">{row.store_name}</div>
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
        name: "Active",
        selector: (row) => row.active,
      },
  
    

    {
      name: "Action",
      selector: (row) => (
        <div className="w-full  transform hover:text-purple-500 ">
        <div className="flex flex-col gap-2 m-2">
          <div className="flex flex-row">
          <Link className="black_btn" href={`/store/detail/${row._id}`}>Details</Link>
          </div>
          <div className="flex flex-row">
          <Link className="Orange_btn" href={`/store/${row._id}`}>Edit</Link>
          </div>
        </div>
         
         

        </div>
        
      ),
    },
  ];

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
    <div className="flex-row w-full">



<div className="flex flex-col sm:flex-row w-full justify-between m-2">

  <Link href="/store/add" className="black_btn">Add Store</Link>
  


</div>

<div className="w-full">

<DataTable
            columns={columns}
            data={filteredData}
            title={<div className="flex flex-row justify-end ">
<div className="flex items-center space-x-2">
<input
  type="text"
  value={filterText}
  onChange={(e) => setFilterText(e.target.value)}
  onKeyDown={handleKeyPress}
  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-400 text-sm"
  placeholder="Filter by Store Name"
/>
      <button
        onClick={filterData}
        className="px-4 py-2 text-white black_btn rounded-md hover:bg-gray-100 focus:outline-none"
      >
        Search
      </button>
    </div>
<div className="flex items-center space-x-2 ml-3">
<button
        onClick={clearFilter}
        className="px-4 py-2 text-white black_btn rounded-md hover:bg-gray-100 focus:outline-none"
      >
        Clear
      </button>
</div>

</div>}
            defaultSortFieldId="createdAt"
            pagination
            paginationPerpage={datalist.length}
          />
</div>

        
      
    </div>
  );
};

export default Page;
