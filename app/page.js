'use client'

import Image from 'next/image'
import { useEffect } from 'react';
import { useRef } from 'react';
import Purok1 from './purok/components/purok1';
import Purok2 from './purok/components/purok2';
import Purok3 from './purok/components/purok3';
import Purok4 from './purok/components/purok4';
import Purok5 from './purok/components/purok5';

export default function Home() {



  return (
    <section className='w-full flex-center flex-col'>
    <div className='flex border-2 justify-center border-red-500 m-4 p-8 rounded-2xl'>
 
    <Purok1 />
    <Purok2 />
    <Purok3 />
    <Purok4 />
    <Purok5 />
    </div>
    <br className='max-md:hidden' />
     
    </section>
   
  )
}

