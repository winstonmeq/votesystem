

import { connectToDB } from "@/utils/database";
import Purok from "@/models/Purok";

import { NextResponse } from "next/server";



export async function GET(request, {params}) {

  const id = params.id

  try {
 
     
   await connectToDB();

   const getdata = await Purok.find({ purok: id }).exec();
    
    return NextResponse.json(getdata)
     

  } catch (error) {
  
    return new Response("Error occurred during database query.");


  } 
}





export async function PATCH(request, {params}) {

  const {PName,Coordinator , Phone, totalVote } = await request.json();
 
   try {
  
     console.log(PName,Coordinator , Phone, totalVote )
      
    await connectToDB();
 
 
     const updatePurok = await Purok.findByIdAndUpdate(
       params.id,
       { PName,Coordinator , Phone, totalVote  },
       { new: true }
     );
     
     if (!updatePurok) {

       return new Response('Purok not found', { status: 404 });
       
     }
     
     return NextResponse.json('Purok Successfully updated')      
 
      
 
   } catch (error) {
   
    return new Response('error');
 
   }  
 }

