

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

    // Validate the incoming data (you can add more checks as needed)
    if (!distribution_name || !type || !target || active === undefined) {
     return new Response(JSON.stringify({ error: 'Invalid data provided' }), { status: 400 });
   }
 

    console.log('checking distribution api data',{distribution_name, type, target , active})

    await connectToDB();

    const addDistribution = Distribution({
        distribution_name:distribution_name,
        target:target,
        type:type,        
        active:active, 
        })
    
    await addDistribution.save();

    return new NextResponse('Distribution add successfully')
    

  } catch (error) {
  
   return new NextResponse('POST Error nih pre!');

  } 
}

