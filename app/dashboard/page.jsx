

'use client'

import { useSession, getSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useState } from 'react';
import Purok_1 from "../purok1/page"
import Purok_2 from "../purok2/page";
import Purok_3 from "../purok3/page";
import Purok_4 from "../purok4/page";
import Purok_5 from "../purok5/page"
import Purok_6 from "../purok6/page";
import Purok_7 from "../purok7/page";
import Purok_8 from "../purok8/page";
import Purok_9 from "../purok9/page";
import Purok_10 from "../purok10/page";

import Status_p1 from '../statusP1/page';


export default function Page() {

  const home = useRef(null)

  const status_bar = useRef(null)
  const contactRef = useRef(null);

  const [loading, setLoading] = useState(true);

  const { data: session, status } = useSession();
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

    setLoading(true);
    
    const checkAdminPrivileges = async () => {

      const session = await getSession();

      if (session == null){

        router.push('/')

      } else {


        if (session.user.isAdmin == false) {

          console.log('check privilege',session.user.isAdmin)
  
          router.push("/purok"); // Redirect to homepage if user is not logged in or doesn't have admin privileges
        } else {
          setLoading(false);
          console.log('session null')
  
        }



      }

    };


    checkAdminPrivileges();

  }, [router]);





  const scrollToRef = (ref) => {

    window.scrollTo({
      
      top: ref.current.offsetTop,
      behavior: 'smooth',

    });

  };


  if (loading) {
     return (
      <div className="flex justify-center min-h-screen ">
        Loading...
      </div>
    );
  }


  
  return (

    <div className='w-screen'>
{  console.log('seesion', session)}
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
 
  <Purok_1 />
  {/* <Purok_2 />
  <Purok_3 />
  <Purok_4 />
  <Purok_5 />
  <Purok_6 />       */}


</div>

<div className='flex flex-wrap justify-center p-1 rounded-2xl'>
  {/* <Purok_7 />
  <Purok_8 />
  <Purok_9 />
  <Purok_10 />
  */}
 
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

