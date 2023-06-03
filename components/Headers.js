import Link from 'next/link'


import React from 'react'

const Headers = () => {
  return (
    <div className='flex w-full gap-3 m-5'>
    <Link href='/'>Home</Link>
    <Link href={'/voters'}>Voter</Link>
    <Link href={'/purok'}>Purok</Link>

    </div>
  )
}

export default Headers