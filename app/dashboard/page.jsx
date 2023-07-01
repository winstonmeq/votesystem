

'use client'

import { useSession, getSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useState } from 'react';
import Purok_1 from '../purok1/page';
import axios from 'axios';
import Status_p1 from '../statusP1/page';
import Link from "next/link";


export default function Page() {

  const home = useRef(null)

  const status_bar = useRef(null)

  const contactRef = useRef(null);

  const [datalist, setdatalist] = useState([]);    

  const [loading, setLoading] = useState(true);


  const router = useRouter();



  // useEffect(() => {

  //   setLoading(true)
    
  //   if (status === "unauthenticated") {

  //     router.push("/"); // Redirect to homepage if user is not logged in

  //   }else {

  //     setLoading(false)
  //   }

 

  // }, [status, router]);

  // useEffect(() => {
  //   const checkAdminPrivileges = async () => {
  //     const session = await getSession();
  
  //     if (!session || !session.user || !session.user.isAdmin) {
  //       router.push('/');
  //     } else {
  //       console.log('successfully logged in');
  //     }
  //   };
  
  //   checkAdminPrivileges();
  // }, [router]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(process.env.LOCAL_URL + '/api/purok1');

        console.log('log data only',data);

        setdatalist(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);


  
  if (loading) {
    return (
     <div className="flex justify-center min-h-screen ">
       Loading...dashboard
     </div>
   );
 }





  // const scrollToRef = (ref) => {

  //   window.scrollTo({
      
  //     top: ref.current.offsetTop,

  //     behavior: 'smooth',

  //   });

  // };


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

 
<div >
    {console.log('data2 nih', datalist)}
    {/* {datalist && datalist.length
        ? datalist.map((item, i) => (
            <div key={i}>{p1(item._id, item.member_yes, item.total.length - item.member_yes, 0)}</div>
          ))
        : null} */}
    </div>
 
  )
}

