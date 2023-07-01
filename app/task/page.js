
'use client'
import React from 'react'
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useState } from 'react';
import Link from "next/link";
import Progress from '../progress/page';
import { getSession } from 'next-auth/react';





const Page = () => {

    const home = useRef(null)

    const status_bar = useRef(null)
  
    const contactRef = useRef(null);
      
    const [datalist, setdatalist] = useState([]);    
  
    const [loading, setLoading] = useState(true);
  
  
    const router = useRouter();

  
    useEffect(() => {
        
        const checkAdminPrivileges = async () => {

          const session = await getSession();
      
          if (!session || !session.user || !session.user.isAdmin) {
            router.push('/');
          } else {
            console.log('successfully logged in');
          }
        };
      
        checkAdminPrivileges();
      }, [router]);
    


    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(process.env.LOCAL_URL + `/api/task`);
                
            setdatalist(data);
          } catch (error) {
            console.error(error);
          } finally {

            setLoading(false)

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
 

      if (loading) {
        return (
         <div className="flex justify-center min-h-screen ">
           Loading...task
         </div>
       );
     }
    
    
        
    
      const scrollToRef = (ref) => {
    
        window.scrollTo({
          
          top: ref.current.offsetTop,
    
          behavior: 'smooth',
    
        });
    
      };
    
    



  return (

    <div className='w-screen'>

<nav className="flex justify-end mb-4 mr-20">
  <ul className="flex">
    <li className="mr-4">
      <a className='hover:text-red-900' onClick={() => scrollToRef(status_bar)}>Status Bar</a>
    </li>
    <li>
      <a onClick={() => scrollToRef(contactRef)}>Contact Us</a>
    </li>
  </ul>
</nav>

    <section ref={home} className='w-full flex-top flex-col h-screen'>
    
    
    <div className='flex flex-wrap justify-center m-1 p-1 rounded-2xl'>
     
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-2">
    {console.log('data2 nih', datalist)}
    {datalist && datalist.length
        ? datalist.map((item, i) => (
            <div key={i}>{p1(item._id, item.member_yes, item.total.length - item.member_yes, 0)}</div>
          ))
        : null}
    </div>
     
    </div>
    
    
    </section>
    
    <section ref={status_bar} className="h-screen w-full bg-red-50 justify-center">
    <button type='button' onClick={() => scrollToRef(home)}>Top</button>
    <h1 className='p-4 flex justify-center'>Status Bar</h1>
    <div className='flex flex-wrap justify-center p-1 rounded-2xl'>
    
    <Progress />
    
    
    </div>
    </section>
    
    
    <section ref={contactRef} className="h-screen w-full bg-green-50">
    
    <div className='flex flex-row justify-center'>
    <p>www.cotrace.com</p>
    </div>
    
    </section>
    
    </div>

   

  )
}

export default Page;