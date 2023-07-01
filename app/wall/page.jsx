
'use client'
import React from 'react'
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useState } from 'react';





const Page = () => {

    const [datalist, setdatalist] = useState([]);    




    const router = useRouter();


    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(process.env.LOCAL_URL + '/api/wall');
                
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
        {datalist.map((item,i) => (
            <div key={i}>
            <li >{item.purok}</li>
            <li >{item.member}</li>
            </div>
        ))}
    </div>
  )
}

export default Page;