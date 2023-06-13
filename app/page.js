'use client'

import Image from 'next/image'
import { useEffect } from 'react';
import { useRef } from 'react';


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

   
     
    </section>
   
  )
}

