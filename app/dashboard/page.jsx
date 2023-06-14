

'use client'

import Purok1 from "../purok/components/purok1"
import Purok2 from "../purok/components/purok2"
import Purok3 from "../purok/components/purok3"
import Purok4 from "../purok/components/purok4"
import Purok5 from "../purok/components/purok5"
import { useSession} from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Purok_5 from "../purok5/page"
import Purok_2 from "../purok2/page"
import Purok_3 from "../purok3/page"


export default function Page() {


  const {data:session} = useSession();

  const router = useRouter();


  useEffect(() => {

    if(!session) {
     // alert('Please login')
      router.push('/')
    }

  }, []);

  return (
    <section className='w-full flex-center flex-col'> 

    <div className='flex justify-center m-4 p-8 rounded-2xl'>
 
    <Purok1 />
    <Purok_2 />
    <Purok_3 />
    <Purok_5 />

    </div>
     
    </section>
   
  )
}

