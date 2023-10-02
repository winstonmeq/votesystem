
'use client'
import React from 'react'
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useState } from 'react';
import Progress from '../progress/page';
import { useSession, getSession } from 'next-auth/react';
import next from 'next';





const Page = () => {

    const home = useRef(null)

    const status_bar = useRef(null)
  
    const contactRef = useRef(null);
      
    const [datalist, setdatalist] = useState([]);    
  
    const [loading, setLoading] = useState(true);
  
    const [isOpen, setIsOpen] = useState(false);

    const { data: session, status } = useSession()

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };
  
    const router = useRouter();
     
    useEffect(() => {
        
      const fetchDataAndCheckAdmin = async () => {
        try {
          if (!session || !session.user.isAdmin) {
            router.push('/');
          } else {
            fetchTask(); // Fetch data after admin check
          }
        } catch (error) {
          console.error('Error checking admin privileges:', error);
        }  
      };
  
      fetchDataAndCheckAdmin();

      }, [session,router]);
    


      const fetchTask = async () => {
        try {
          const { data } = await axios.get(process.env.LOCAL_URL + '/api/task', { next: { revalidate: 10 } });

          setdatalist(data);

        } catch (error) {

          console.error('Error fetching task data:', error);

        } finally {

          setLoading(false);

        }

      };




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
                {Pname}
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
              {Pname}
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
              {Pname}
              </div>
            </div>
          );
        }
      };
 

      if (loading) {
        return (

          <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <div class="flex flex-col items-center">
            <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
            <p class="mt-4">Loading...</p>
          </div>
        </div>

          )     
       
     }

     //this code for opening a modal page

    //  <button
    //     className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
    //     onClick={toggleModal}
    //   >
    //     Open Modal
    //   </button>

    //   {isOpen && (
    //     <div className="fixed inset-0 flex items-center justify-center z-50">
    //       <div className="bg-white p-4 rounded shadow-md">
    //         <h2 className="text-lg font-semibold mb-2">Modal Content</h2>
    //         <p>This is the content of the modal.</p>
    //         <button
    //           className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
    //           onClick={toggleModal}
    //         >
    //           Close
    //         </button>
    //       </div>
    //     </div>
    //   )}
    
    
        
    
      const scrollToRef = (ref) => {
    
        window.scrollTo({
          
          top: ref.current.offsetTop,
    
          behavior: 'smooth',
    
        });
    
      };
    
    



  return (

    <div ref={home} className='w-screen'>

<nav className="flex justify-center mb-4">
  <ul className="flex">
    <li className="mr-4">
      <a className='hover:text-red-900 font-bold cursor-pointer' onClick={() => scrollToRef(status_bar)}>Status Bar</a>
    </li>
    <li>
      <a className='hover:text-red-950 font-bold cursor-pointer' onClick={() => scrollToRef(contactRef)}>Contact Us</a>
    </li>
  </ul>
</nav>



    <section  className='w-full flex-top flex-col h-screen'>
    
    
    <div className='flex flex-wrap justify-center m-1 p-1 rounded-2xl'>


     {loading &&  (

          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
            <p className="mt-4">Loading...</p>
          </div>
        </div>

          )

               
     }


     
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
    <div className='flex flex-row justify-center'>
    <h1 className='p-4 flex justify-center'>Status Bar</h1>
    <button type='button' onClick={() => scrollToRef(home)}>Top</button>

    </div>
    <div className='flex flex-wrap justify-center p-1 rounded-2xl'>

    <Progress />
    
    
    </div>
    </section>
    
    
    <section ref={contactRef} className="h-screen w-full bg-green-50">
    
    <div className='flex flex-row justify-center'>
    <p>Poweredby: www.alistoplus.com</p>
    </div>
    
    </section>
    
    </div>

   

  )
}

export default Page;