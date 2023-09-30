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

  const [filteredData, setFilteredData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filterText2, setFilterText2] = useState('');
  const [filterDate, setFilterDate] = useState("");



  useEffect(() => {
        
    const fetchDataAndCheckAdmin = async () => {
      try {
        if (!session || !session.user.isAdmin) {
         router.push('/');
        } else {
          console.log(session);
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
        const { data } = await axios.get(process.env.LOCAL_URL + '/api/generate');
        setdatalist(data);
        setFilteredData(data)
      } catch (error) {
        console.error('Error fetching store data:', error);
      } finally {
        setLoading(false);
      }
    };



    const filterData = () => {
      const filtered = filteredData.filter(item =>
        item.voter_lname[0].toLowerCase().includes(filterText.toLowerCase())
      );
      setFilteredData(filtered);
    };


    const filterData2 = () => {
      const filtered = filteredData.filter(item =>
        item.store_name[0].toLowerCase().includes(filterText2.toLowerCase())
      );
      setFilteredData(filtered);
    };



    
  const clickfilterDate = () => {
    const filtered = filteredData.filter(item =>
      item.createdAt.includes(filterDate)
    );
    console.log(filterDate)
    setFilteredData(filtered);
  };

  
    const clearFilter = () => {
      setFilterText('');
      setFilterText2('');
      setFilteredData(datalist);
    };


    const handleKeyPress = (e) => {
      // Check if the Enter key (key code 13) was pressed
      if (e.key === 'Enter') {
        // Call the search function when Enter is pressed
       filterData()
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
        name: "Store Name",
        selector: (row) => row.store_name[0],
      },

      {
        name: "Activity",
        selector: (row) => (
          <div className="justify-center text-sm">{row.distribution_name[0]}</div>
          
        ),
         
      },
    

    {
        name: "Name",
        selector: (row) => row.voter_lname[0] +', ' + row.voter_fname[0],
      },
    
      {
        name: "Date",
        selector: (row) => row.createdAt,
      },

      {
        name: "Barangay",
        selector: (row) => row.barangay,
      },

   

    {
      name: "Status",
      selector: (row) => row.status,
    },

    {
        name: "Active",
        selector: (row) => row.active,
      },
       
     

    {
      name: "Action",
      selector: (row) => (
        <div className="w-100 transform hover:text-purple-500 hover:scale-110">
        <Link href={`/generate/${row._id}`}> <button className="rounded p-2 bg-red-600 font-bold text-white">Edit</button></Link>
          
        </div>
        
      ),
    },
  ];

  return (
    <div className="flex-row w-full">

<div className="flex flex-col sm:flex-row w-full justify-between m-2">

  <Link href="/generate/add" className="black_btn">Add Benificiaries</Link>



</div>

<div className="w-full">

<DataTable
            columns={columns}
            data={filteredData}
            title={<div className="flex flex-row justify-end ">


<div className="flex items-center space-x-2">
<input
  type="date"
  value={filterDate}
  onChange={(e) => setFilterDate(e.target.value)}
  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-400 text-sm"
  placeholder="Filter by Date"
/>
      <button
        onClick={clickfilterDate}
        className="px-4 py-2 text-white black_btn rounded-md hover:bg-gray-100 focus:outline-none"
      >
        Search
      </button>
    </div>








<div className="flex items-center space-x-2">
<input
  type="text"
  value={filterText}
  onChange={(e) => setFilterText(e.target.value)}
  onKeyDown={handleKeyPress}
  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-400 text-sm"
  placeholder="Filter by Lastname"
/>
      <button
        onClick={filterData}
        className="px-4 py-2 text-white black_btn rounded-md hover:bg-gray-100 focus:outline-none"
      >
        Search
      </button>
    </div>





    <div className="flex items-center space-x-2 ml-3">
<input
  type="text"
  value={filterText2}
  onChange={(e) => setFilterText2(e.target.value)}
  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-400 text-sm"
  placeholder="Filter by Store Name"
/>
      <button
        onClick={filterData2}
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
