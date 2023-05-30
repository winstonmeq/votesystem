import Link from 'next/link'


import React from 'react'

const Headers = () => {
  return (
    <div className='flex w-full gap-3 m-5'>
    <Link href='/'>Headers</Link>
    <Link href={'/users'}>Users</Link>
    </div>
  )
}

export default Headers