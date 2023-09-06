"use client";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import QRCode from 'qrcode.react';

function QRCodePage({idcode}) {
  const [inputValue, setInputValue] = useState(idcode);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    
    <div className="w-[210mm] h-[297mm] p-20 border border-black box-border">
   Qr code page
  </div>


   
  );
}

export default QRCodePage;
