

import Distribution from "@/models/Distribution";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";


export async function GET(request) {

  try {


    await connectToDB();

    const getdata = await Distribution.find({}).exec();

    return NextResponse.json(getdata)
    
    

  } catch (error) {
  
   return new Response('GET Error nih pre!');

  } 
}



export async function POST(request) {

  try {


    const { distribution_name, type, target , active} = await request.json();

    console.log('checking distribution api data',{distribution_name, type, target , active})


    await connectToDB();

    const addDistribution = new Distribution({
        distribution_name:distribution_name,
        target:target,
        type:type,        
        active:active, 
        })
    
    await addDistribution.save();

    
    console.log('Distribution data save')

    return new Response(JSON.stringify('Distribution add successfully'))
    

  } catch (error) {
  
   return new Response('POST Error nih pre!');

  } 
}

