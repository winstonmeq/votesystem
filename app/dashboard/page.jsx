

'use client'

import { useSession, getSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useState } from 'react';
import Purok_1 from '../purok1/page';
import axios from 'axios';
import Status_p1 from '../statusP1/page';


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
 
 {/* <Purok_1 data2={datalist} /> */}
 
</div>


</section>

<section ref={status_bar} className="h-screen w-full bg-red-50 justify-center">
<button type='button' onClick={() => scrollToRef(home)}>Top</button>
<h1 className='p-4 flex justify-center'>Status Bar</h1>
<div className='flex flex-wrap justify-center p-1 rounded-2xl'>

{/* <Status_p1 /> */}


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

