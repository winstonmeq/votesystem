"use client";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";

import { useSession, getSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import QRCodeScanner from "./QRCodeScanner";




const Page = () => {

  const { data: session, status } = useSession();
  const router = useRouter();

  

  useEffect(() => {
        
    const fetchDataAndCheckAdmin = async () => {
      try {
        if (!session || !session.user.isAdmin) {
          router.push('/');
        } else {
          console.log('successfully logged in');
          fetchData(); // Fetch data after admin check
        }
      } catch (error) {
        console.error('Error checking admin privileges:', error);
      }  
    };

    fetchDataAndCheckAdmin();
    
    }, [router]);


    
  

 
  

  return (
    <div className="flex-row w-full">



<div className="w-full">


</div>
  <h1>QR Code Scanner</h1>
        
      <QRCodeScanner />
    </div>
  );
};

export default Page;






