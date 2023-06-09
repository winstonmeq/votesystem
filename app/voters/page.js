'use client'
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import DataTable from "react-data-table-component";

const Page = () => {

  const [datalist, setdatalist] = useState([]);    
  const [loading, setLoading] = useState(true);


  useEffect(() => {   

    async function FetchData() {
      try {
      const { data } = await axios.get(process.env.LOCAL_URL + `/api/voter`)
      setdatalist(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
           
  }
 
    FetchData();
    }, []);


    

    if (loading) {
      return <div className="flex justify-center items-center min-h-screen ">Loading...</div>;
    }

    const columns = [
     
      {
        name:"Name",
        selector:(row) => row.member ? <div className="text-red-900 font-bold">{row.fname} {row.lname}</div> : <div>{row.fname} {row.lname}</div>
      },
     
      {
        name:"Age",
        selector:(row) => <div className="justify-center text-sm">{row.age}</div>
      },

      {
        name:"Position",
        selector:(row) => row.position
      },
      {
        name:"Precinct",
        selector:(row) => row.prec_num
      },

      {
        name:<div className=" text-white text-sm bg-slate-500 p-2 rounded-lg font-bold">Purok</div>,
        selector:(row) => row.purok
      },

      
      {
        name:"Action",
        selector:(row) =>  <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                <Link href={`/voters/${row._id}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
      
                                            </Link>
                                                  
                                           </div>
      },




    ]


  return (

<div className='overflow-x-auto'>
  <div className='min-h-screen bg-gray-100 flex justify-center font-sans '>
  <div className="m-2 w-full lg:w-5/6">
 
 
  <DataTable
columns={columns}
data={datalist}
title="Voter Lists"
defaultSortFieldId="createdAt"
pagination
paginationPerpage={datalist.length}
/>


</div>
</div>


</div>

  //  <div className='overflow-x-auto'>
  //   <div className='min-w-screen min-h-screen bg-gray-100 flex justify-center font-sans overflow-hidden'>
  //    <div className="m-2 w-full lg:w-5/6">
  //    <div className="flex flex-row text-right justify-between text-sm">
    
  //    <div className="relative">
  //    <form>
  //    <div className="flex flex-row">
  //    <div className="text-sm items-center p-2">Icon</div>
  //    <input type="search" className="block w-full p-2 pl-5 text-sm text-gray-900 border border-gray-400 rounded-lg bg-gray-50"></input>
  //    <button type="submit" className="ml-2 rounded-md bg-blue-500 py-2 px-4 hover:bg-blue-700 text-white">Search</button>
  //    </div>
  //    </form>

   
     
  //    </div>
  //    <div className="bg-blue-500 py-2 px-4 hover:bg-blue-700 text-white font-bold rounded"><Link href={'/voters/add'}>Add Voter</Link></div></div>
     
  //     <div className="bg-white shadow-md rounded my-6">
  //       <table className='min-w-max w-full table-auto'>
  //       <thead>
  //           <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
  //             <th className="py-3 px-6 text-left">First Name</th>
  //             <th className="py-3 px-6 text-left">Last Name</th>
  //             <th className="py-3 px-6 text-center">Age</th>
  //             <th className="py-3 px-6 text-center">Position</th>
  //             <th className="py-3 px-6 text-center">Precinct</th>
  //             <th className="py-3 px-6 text-center">Purok</th>
  //             <th className="py-3 px-6 text-center">Status</th>
  //           </tr>
  //         </thead>
  //         <tbody className="text-gray-600 text-sm font-light">
  //           {datalist.map((item, i) => (
  //             <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
  //               <td className="py-3 px-6 text-left whitespace-nowwrap">{item.fname}</td>
  //               <td className="py-3 px-6 text-left whitespace-nowwrap">{item.lname}</td>
  //               <td className="py-3 px-6 text-center whitespace-nowwrap">{item.age}</td>
  //               <td className="py-3 px-6 text-center whitespace-nowwrap">{item.position}</td>
  //               <td className="py-3 px-6 text-center whitespace-nowwrap">{item.prec_num}</td>
  //               <td className="py-3 px-6 text-center whitespace-nowwrap">{item.purok}</td>
  //               <td className="py-3 px-6 text-center">
  //                                   <div className="flex item-center justify-center">
                                      
  //                                       <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
  //                                         <Link href={`/voters/${item._id}`}>
  //                                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //                                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  //                                           </svg>

  //                                         </Link>
                                            
  //                                       </div>
                                       
  //                                   </div>
  //                               </td>
  //             </tr>
  //           ))}
  //         </tbody>

  //       </table>
  //     </div>
  //    </div>
  //   </div>
  //  </div>
    
  )
}

export default Page