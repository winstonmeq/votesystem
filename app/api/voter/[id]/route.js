import dbConnect from "@/conn/dbconnect";
import Voter from "@/models/Voter";

import { NextResponse } from "next/server";



export async function GET(request, {params}) {

  const id = params.id

  try {
 
    console.log(id)
     
    await dbConnect();

    const getdata = await Voter.find({_id:id}).exec();
    
    //return new Response(JSON.stringify(getdata))

    return NextResponse.json(getdata)
     

  } catch (error) {
  
   return new Response('error');

  } 
}


export async function PATCH(request, {params}) {

 const {fname,lname} = await request.json();

  try {
 
    console.log(fname,lname)
     
    await dbConnect();
    
    const updatedata = await Voter.findById(params.id);

    if (!updatedata) {
      return new Response("Voter not found", { status: 404 });
  }

  // Update the prompt with new data
  updatedata.fname = fname;
  updatedata.lname = lname;

  await updatedata.save();

    
  return NextResponse.json('Successfully updated')      

     

  } catch (error) {
  
   return new Response('error');

  } 
}

