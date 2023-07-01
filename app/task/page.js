
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


      const p1 = (Pname, x, y, z) => {
      
        if (x >= y && x >= z) {
          return (
            <div
              style={{
                margin: '5px',
                width: '80px',
                height: '80px',
                backgroundColor: 'green',           
                borderRadius: '10px',
                '@media (maxWidth: 600px)': {
                  width: '60px',
                  height: '60px',
                },
              }}
            >
              <div className='text-white p-2 font-bold'>
                <Link href={`/purok/${Pname}`}>{Pname}</Link>
              </div>
            </div>
          );
        } else if (y >= x && y >= z) {
          return (
            <div
              style={{
                margin: '5px',
                width: '80px',
                height: '80px',
                backgroundColor: 'red',
                borderRadius: '10px',
                '@media (maxWidth: 600px)': {
                  width: '60px',
                  height: '60px',
                },
              }}
            >
              <div className='text-white p-2 font-bold'>
                <Link href={`/purok/${Pname}`}>{Pname}</Link>
              </div>
            </div>
          );
        } else {
          return (
            <div
              style={{
                margin: '5px',
                width: '80px',
                height: '80px',
                backgroundColor: 'black',
                borderRadius: '10px',
                '@media (maxWidth: 600px)': {
                  width: '60px',
                  height: '60px',
                },
              }}
            >
              <div className='text-white p-2 font-bold'>
                <Link href={`/purok/${Pname}`}>{Pname}</Link>
              </div>
            </div>
          );
        }
      };
 

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-2">
    {console.log('data2 nih', datalist)}
    {datalist && datalist.length
        ? datalist.map((item, i) => (
            <div key={i}>{p1(item._id, item.member_yes, item.total.length - item.member_yes, 0)}</div>
          ))
        : null}
    </div>

  )
}

export default Page;