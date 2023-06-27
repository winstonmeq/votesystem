
'use client'

import Link from "next/link";


function Admin_page () {


    return (
        <div className="flex flex-col w-full bg-cyan-50">
            <div className="flex m-4 flex-row justify-center">You are not allowed!</div>
            <div className="flex m-2 flex-row justify-center">
            <div className="text-md font-bold"><Link href={'/'}>Home</Link> </div>
            </div>
        </div>
        
    )







}

export default Admin_page;