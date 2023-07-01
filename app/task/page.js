
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



 

  return (
    <div>
  {console.log(datalist)}
    </div>
  )
}

export default Page;