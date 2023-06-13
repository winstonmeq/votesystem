'use client'
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import DataTable from "react-data-table-component";


const Page = ({ params: { id } }) => {

  const [datalist, setdatalist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [puroklist, setpuroklist] = useState([]);
  const [purok, setpurok] = useState("");


  useEffect(() => {

    async function FetchData() {
      try {
        const { data } = await axios.get(process.env.LOCAL_URL + `/api/purok/${id}`)
        setdatalist(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }

    }


    async function FetchData2() {
      try {
        const { data } = await axios.get(process.env.LOCAL_URL + `/api/purok`)
        setpuroklist(data);


      } catch (error) {

        console.error(error);

      }

    }

    FetchData2();
    FetchData();
  }, [id]);



  const handleSelectChange = async (e) => {
    const selectedPurok = e.target.value;
    setpurok(selectedPurok);

    try {
      // Make an API request or perform any action you need based on the selected purok
       const { data } = await axios.get(process.env.LOCAL_URL + `/api/purok/${selectedPurok}`)
      setdatalist(data);
      setLoading(false);


    } catch (error) {
      console.error(error);
    }
  };










  const columns = [
    {
      name: "Name",
      selector: (row) =>
        row.member ? (
          <div className="text-red-900 flex-row w-full font-bold">
            {row.fname} {row.lname}
          </div>
        ) : (
          <div>
            {row.fname} {row.lname}
          </div>
        ),
        
    },

    {
      name: <div className="sm:flex hidden">Age</div>,
      selector: (row) => (
        <div className="sm:flex hidden ">{row.age}</div>
      ),
    },

    // {
    //   name: "Position",
    //   selector: (row) => row.position,
    // },
    {
      name: "Precinct",
      selector: (row) => row.prec_num,
    },

    // {
    //   name: (
    //     <div className=" text-white text-sm bg-slate-500 p-2 rounded-lg font-bold">
    //       Purok
    //     </div>
    //   ),
    //   selector: (row) => row.purok,
    // },

    {
      name: "Action",
      selector: (row) => (
        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
          <Link href={`/voters/${row._id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </Link>
        </div>
      ),
    },
  ];





  if (loading) {
    return <div className="flex text-sm justify-center min-h-screen ">Loading...</div>;
  }



  return (
    <div className="flex-row w-full">

      <div className="flex-col">
        <div className="flex-row">
        <div className="relative z-0 w-full mb-6 group">
             
          <div className="flex flex-row ">
           <select value={purok} onChange={handleSelectChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
             <option value=''>Select Purok</option>
           {puroklist.map((item,i)=> (
             <option key={i} value={item.PName}>{item.PName}</option>
           ))}
 
           </select>
 
 
             </div>
             </div>

        </div>
          <div className="flex-row w-full">
            <DataTable
              columns={columns}
              data={datalist}
              defaultSortFieldId="createdAt"
              pagination
              paginationPerpage={datalist.length}
            />

          </div>
     

      </div>



    </div>

  )
}

export default Page