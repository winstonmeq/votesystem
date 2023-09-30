
'use client'

import React, { useRef } from "react";
import QRCode from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useSession, getSession } from 'next-auth/react';
import Link from "next/link";



function QRCodePage({ params: { id } }) {

  const qrCodeValue = id;
  const [loading, setLoading] = useState(true);
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [purok, setpurok] = useState("");
  const { data: session, status } = useSession();

  const router = useRouter()




  let componentRef = useRef(null);

  const generatePDF = () => {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit:'in',
      format:[2.125,3.2]
    });
    


    const content = componentRef.current;

    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      // const pdfWidth = pdf.internal.pageSize.getWidth();
      // const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "JPEG", 0.1, 0.1, 3.0, 1.95);
      pdf.save("qrcode.pdf");

    });

  };


  useEffect(() => {
        
    const fetchDataAndCheckAdmin = async () => {
      try {
        if (!session || !session.user.isAdmin) {
          router.push('/');
        } else {
          console.log('successfully logged in');
          FetchData();
        }
      } catch (error) {
        console.error('Error checking admin privileges:', error);
      }  
    };

    fetchDataAndCheckAdmin();
    }, [session,router]);
  


   const FetchData = async () => {
    setLoading(true)
      try {
        const { data } = await axios.get(
          process.env.LOCAL_URL + `/api/voter/${id}`
        );

   
        if (data.length > 0) {
          setfname(data[0].fname);
          setlname(data[0].lname);
          setpurok(data[0].purok);

        }

        
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
     

    }


    if (loading) {
    
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
          <p className="mt-4">Loading...</p>
        </div>
        </div>
      );
    }
  







  return (
    <div>

<div className="flex flex-row justify-start m-4"><h1>Click to generate QR Code and download.</h1></div>
      <div ref={componentRef}>  

      <div className="flex flex-row bg-white border border-solid border-1 border-gray">

        <div className="flex flex-col p-4">
         <div className="flex flex-row">
          {fname}
         </div>
         <div className="flex flex-row">
          {lname}
         </div>
         <div className="flex flex-row">
         {purok}
         </div>
        </div>
        <div className="flex flex-col p-1 m-1 ">
       
        <QRCode
          value={qrCodeValue}
          size={220}
          fgColor="#000000"
          imageSettings={{
            src: "/images/cotraceLogo.png",
            excavate: true,
            height: 20,
            width: 20,
          }}
          level="H"
          includeMargin={true}
        />        
      </div>
        </div>

      </div>
      
      <div className="flex flex-row m-4 justify-between">

      <Link href={"/voters"}><button className="black_btn">Back</button></Link>

      <button className="black_btn" onClick={generatePDF}>Generate PDF</button>
      </div>
       
     
    </div>
    
  );
}

export default QRCodePage;
