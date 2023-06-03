import dbConnect from "@/conn/dbconnect";
import Purok from "@/models/Purok";

import { NextResponse } from "next/server";



export async function GET(request, {params}) {

  const id = params.id

  try {

 
    console.log(id)
     
    await dbConnect();

    const getdata = await Purok.find({PName:id}).exec();
    
    //return new Response(JSON.stringify(getdata))

    return NextResponse.json(getdata)
     

  } catch (error) {
  
   return new Response('Error nih pre!');

  } 
}


