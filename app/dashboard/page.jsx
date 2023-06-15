

'use client'

import { useSession} from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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


  useEffect(() => {

   
  }, []);


  
  return (
    <section className='w-full flex-center flex-col'>

    <div className='flex flex-wrap justify-center m-1 p-1 rounded-2xl'>
     
      <Purok_1 />
      <Purok_2 />
      <Purok_3 />
      <Purok_4 />
      <Purok_5 />
      <Purok_6 />      


    </div>
    
    <div className='flex flex-wrap justify-center p-1 rounded-2xl'>
      <Purok_7 />
      <Purok_8 />
      <Purok_9 />
      <Purok_10 />
     
     
    </div>

    <div className='flex flex-wrap justify-center p-1 rounded-2xl'>
    
     <Status_p1 />
     
     
    </div>
  
  </section>
   
  )
}

