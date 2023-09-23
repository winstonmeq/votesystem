
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




function QRCodePage({ params: { id } }) {

  const qrCodeValue = id;
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
      format:[2.125,3.175]
    });
    


    const content = componentRef.current;

    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      // const pdfWidth = pdf.internal.pageSize.getWidth();
      // const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "JPEG", 0.2, 0.2, 2.8, 1.8);
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
      }
     

    }




  return (
    <div
      // className="p-20"
      // style={{
      //   width: "210mm", // A4 width in mm
      //   height: "297mm", // A4 height in mm
      //   margin: "0 auto", // Center the content on the page
      // }}
    >

<h1>QR Code Generator</h1>
      <div ref={componentRef}>     
      <div className="flex flex-row border w-full border-solid border-1 border-black">

        <div className="flex flex-col p-4 w-1/2">
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
        <div className="flex flex-col p-4 m-4 w-1/2">
       
        <QRCode
          value={qrCodeValue}
          size={150}
          fgColor="#000000"
          imageSettings={{
            src: "/images/cotraceLogo.png",
            excavate: true,
            height: 40,
            width: 40,
          }}
          level="H"
          includeMargin={true}
        />        
      </div>
        </div>

      </div>
      
       
      <button className="black_btn m-4" onClick={generatePDF}>Generate PDF</button>
    </div>
  );
}

export default QRCodePage;
