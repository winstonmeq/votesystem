import dbConnect from "@/conn/dbconnect";
import Voter from "@/models/Voter";

import { NextResponse } from "next/server";



export async function GET(request, {params}) {

  const id = params.id

  try {

 
    console.log(id)
     
    await dbConnect();

    const getdata = await Voter.find({prec_num:'1231231'}).exec();
    
    //return new Response(JSON.stringify(getdata))

    return NextResponse.json(getdata)
     

  } catch (error) {
  
   return new Response('Error nih pre!');

  } 
}


