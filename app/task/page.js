
'use client'
import React from 'react'
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useState } from 'react';
import DataTable from "react-data-table-component";
import Link from "next/link";





const Page = () => {

    const [datalist, setdatalist] = useState([]);    




    const router = useRouter();


    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(process.env.LOCAL_URL + `/api/task`);
                
            setdatalist(data);
          } catch (error) {
            console.error(error);
          } finally {


          }
        };
      
        fetchData();
      }, []);











      const columns = [
        {
          name: "Name",
          selector: (row) =>
            row.member ? (
              <div className="text-red-900 font-bold">
                {row.fname} {row.lname}
              </div>
            ) : (
              <div>
                {row.fname} {row.lname}
              </div>
            ),
        },
    
        {
          name: "Age",
          selector: (row) => (
            <div className="justify-center text-sm">{row.age}</div>
          ),
        },
    
        // {
        //   name: "Position",
        //   selector: (row) => row.position,
        // },
        // {
        //   name: "Precinct",
        //   selector: (row) => row.prec_num,
        // },
    
        {
          name: (
            <div className=" text-white text-sm bg-slate-500 p-2 rounded-lg font-bold">
              Purok
            </div>
          ),
          selector: (row) => row.purok,
        },
    
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

  return (
    <div>
    <DataTable
            columns={columns}
            data={datalist}
            title="Voter Lists"
            defaultSortFieldId="createdAt"
            pagination
            paginationPerpage={datalist.length}
          />
    </div>
  )
}

export default Page;