import Link from 'next/link'


import React from 'react'

const Headers = () => {
  return (
    <div className='flex-between w-full mb-16 pt'>
    <Link href='/'>Home</Link>
    <Link href={'/voters'}>Voter</Link>
    <Link href={'/purok'}>Purok</Link>

    </div>
  )
}

export default Headers