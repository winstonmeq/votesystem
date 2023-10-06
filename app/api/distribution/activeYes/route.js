

import Distribution from "@/models/Distribution";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";


export async function GET(request) {

  try {


    await connectToDB();

    const getdata = await Distribution.find({active:'Yes'}).exec();

    return NextResponse.json(getdata)
    
    

  } catch (error) {
  
   return new Response('GET Error nih pre!');

  } 
}

export async function POST(request) {

  try {


    await connectToDB();

    const getdata = await Distribution.find({active:'Yes'}).exec();

    return NextResponse.json(getdata)
    
    

  } catch (error) {
  
   return new Response('GET Error nih pre!');

  } 
}


export async function POST(request) {

  try {


    await connectToDB();

    // const getdata = await Distribution.find({active:'Yes'}).exec();

    // return NextResponse.json(getdata)
    
    

  } catch (error) {
  
   return new Response('GET Error nih pre!');

  } 
}