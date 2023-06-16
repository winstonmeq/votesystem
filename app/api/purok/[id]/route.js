

import { connectToDB } from "@/utils/database";
import Voter from "@/models/Voter";

import { NextResponse } from "next/server";



export async function GET(request, {params:{id}}) {


  try {
 
     
   await connectToDB();

   const getdata = await Voter.find({ purok: id }).lean().exec();
    
    //return new Response(JSON.stringify(getdata))

    return NextResponse.json(getdata)
     

  } catch (error) {
  
    return new Response("Error occurred during database query.");


  } 
}


