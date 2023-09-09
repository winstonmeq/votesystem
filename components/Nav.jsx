


'use client'
import Link from "next/link"
import Image from 'next/image';
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';


function Nav() {

const {data:session} = useSession();

const [providers, setProviders] = useState(null)

const [toggleDropdown, setToggleDropdown] = useState(false)




useEffect(() =>{

    const setUpProviders = async () => {

        const response = await getProviders();

       // console.log('nav page providers', response)

        setProviders(response)
    }

    setUpProviders();

},[])



  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href={'/'} className="flex gap-2 flex-center">
            <Image src='/images/cotraceLogo.png' 
            width={50}
            height={50} 
            alt="Cotrace Logo"
            className="objec-contain"
            />
         <p className="logo_text">CoTrace</p>
        </Link>

{/* 
       desktop navigation */}

        <div className="sm:flex hidden relative">
              {session?.user ? (
                <div className="flex gap-3 md:gap-6">
                    
                   <Link href={'/task'} className="black_btn">Task</Link>

                   <Link href={'/store'} className="black_btn">Stores</Link>

                   <Link href={'/distribution'} className="black_btn">Distribution</Link>

                    <Link href={'/voters'} className="black_btn">Voters</Link>

                    <button type="button" onClick={signOut} className="outline_btn">
                        Sign Out
                    </button>
                    <Link href={'/'}>
                        <Image src={session?.user.image} width={37} height={37}
                        className="rounded-full" alt="profile"
                         />
                    </Link>
                </div>
              ):(
                <>
                {providers && Object.values(providers).map((provider) => (

                        <button type="button" key={provider.name} onClick={() => 
                        signIn(provider.id)} className="black_btn">Sign In

                        </button>

                )
                
                
                )}

                </>

              )}
        </div>

     {/* Mobile Navigation */}


     {/* {alert(session?.user)} */}

       <div className="sm:hidden flex relative">
        {session?.user? (
            <div className="flex">
                    <Image src={session?.user.image} 
                    width={37} height={37}
                    className="rounder-full"
                    alt="profile" 
                    onClick={() => setToggleDropdown((prev) => !prev)}
                    />

                    {toggleDropdown && (
                        <div className="dropdown">

                            <Link href={'/task'}
                           className="dropdown_link"
                           onClick={() =>setToggleDropdown(false)}
                           >
                            Task
                           </Link>
    
                           <Link href={'/store'}
                           className="dropdown_link"
                           onClick={() =>setToggleDropdown(false)}
                           >
                            Store
                           </Link>
    

                           <Link href={'/distribution'}
                           className="dropdown_link"
                           onClick={() =>setToggleDropdown(false)}
                           >
                            Distribution
                           </Link>     

                           <Link href={'/voters'}
                           className="dropdown_link"
                           onClick={() =>setToggleDropdown(false)}
                           >
                            Voter
                           </Link>                            

                           <button type="button" className="mt-5 w-full black_btn" 
                           onClick={() => {
                            setToggleDropdown(false)
                           signOut()
                           }                         
                         
                           }
                           >Sign Out</button>
                        </div>
                    )}

                   



            </div>

        ):(<>

            {providers && Object.values(providers).map((provider) => (

                <button type="button" key={provider.name} onClick={() => 
                signIn(provider.id)} className="black_btn">Sign In

            </button>

)


)}



        </>)}
       </div>








    </nav>
  )
}

export default Nav