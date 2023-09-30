"use client";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";



const Page = () => {


  const [datalist, setdatalist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  const [globalFilter, setGlobalFilter] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filterTextPurok, setFilterTextPurok] = useState('');


  

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
        const { data } = await axios.get(process.env.LOCAL_URL + '/api/voter');
        setdatalist(data);
        setFilteredData(data)
      } catch (error) {
        console.error('Error fetching voters data:', error);
      } finally {
        setLoading(false);
      }
    };


   
    
    const filterData = () => {
      const filtered = filteredData.filter(item =>
        item.lname.toLowerCase().includes(filterText.toLowerCase())
      );
      setFilteredData(filtered);
    };
  
    const clearFilter = () => {
      setFilterText('');
      setFilteredData(datalist);
    };


    const filterPurok = () => {
      const filtered = filteredData.filter(item =>
        item.purok.toLowerCase().includes(filterTextPurok.toLowerCase())
      );
      setFilteredData(filtered);
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
        name: "Firstname",
        selector: (row) => (
          <div className="justify-center text-sm">{row.fname}</div>
        ),
         
      },
  
      {
        name: "Lastname",
        selector: (row) => (
          <div className="justify-center text-sm">{row.lname}</div>
        ),
      },
  
      {
          name: "Mobile",
          selector: (row) => row.mobile,
        },
         
        {
          name: "Purok",
          selector: (row) => row.purok,
        },
  
      {
        name: "Member",
        selector: (row) =>   row.member == "Yes" ? (
          <div className="text-white flex-row w-full font-bold rounded-full bg-red-500 p-2">
            {row.member}
          </div>
        ) : (
          <div>
            {row.member}
          </div>
        ),
      },
       
  
      {
        name: "Action",
        selector: (row) => (
          <div className="flex flex-row w-full transform hover:text-purple-500 gap-2">
          <Link className="flex flex-col black_btn" href={`/voters/${row._id}`}>Edit </Link>
          <Link className="flex flex-col Orange_btn" href={`/qrcode/${row._id}`}>QR </Link>

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

  <Link href="/voters/add" className="black_btn">Add Voter</Link>
  
</div>


<DataTable
            columns={columns}
            data={filteredData}
            title={<div className="flex flex-row justify-end ">

<div className="flex items-center space-x-2">
<input
  type="text"
  value={filterTextPurok}
  onChange={(e) => setFilterTextPurok(e.target.value)}
  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-400 text-sm"
  placeholder="Filter by Purok"
/>
      <button
        onClick={filterPurok}
        className="px-4 py-2 text-white black_btn rounded-md hover:bg-gray-100 focus:outline-none"
      >
        Search
      </button>
    </div>

<div className="flex items-center space-x-2 ml-2">
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
<button
        onClick={clearFilter}
        className="px-4 py-2 text-white black_btn rounded-md hover:bg-gray-100 focus:outline-none"
      >
        Clear
      </button>
</div>

</div>}
            striped
            highlightOnHover
            defaultSortFieldId="createdAt"
            pagination
            paginationPerpage={datalist.length}
          />
        
      
    </div>
  );
};

export default Page;
