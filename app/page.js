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


    <h1 className='head_text text-center'>
      Discover & Share
    
    <br className='max-md:hidden' />

      <span className='orange_gradient text-center'>
      Unforgettable experiences that create lifelong memories</span>
    </h1>

    <p className='desc text-center'>
    Our tourism promotion unlocks the wonders of our destination, where captivating landscapes, vibrant cultures, and unforgettable memories await. Embark on a journey that will leave you inspired and forever transformed.</p>

    {/* <div className='flex justify-center m-4 p-8 rounded-2xl'>
 
    <Purok1 />
    <Purok2 />
    <Purok3 />
    <Purok4 />
    <Purok5 />
    </div> */}
     
    </section>
   
  )
}

