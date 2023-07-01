

import Voter from "@/models/Voter";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";


export async function GET(request) {

  try {


    await connectToDB();

    const getdata = await Voter.find({purok:'Purok9'}).exec();

    return NextResponse.json(getdata)
    
    //return new Response(JSON.stringify(getdata))
     

  } catch (error) {
  
   return new Response('GET Error nih pre!');

  } 
}



