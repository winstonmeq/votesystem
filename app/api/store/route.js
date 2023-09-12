

import Store from "@/models/Store";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";


export async function GET(request) {

  try {


    await connectToDB();

    const getdata = await Store.find({}).exec();

    return NextResponse.json(getdata)
    
    

  } catch (error) {
  
   return new Response('GET Error nih pre!');

  } 
}


export async function POST(request) {



  try {

    
  const { store_name, owner_name, mobile, barangay, municipality, active } = await request.json();

  console.log('Checking store API data', { store_name, owner_name, mobile, barangay, municipality, active });

  // Validate the incoming data (you can add more checks as needed)
  if (!store_name || !owner_name || !mobile || !barangay || !municipality || active === undefined) {
    return new Response(JSON.stringify({ error: 'Invalid data provided' }), { status: 400 });
  }

   
    // Assuming connectToDB establishes a database connection
    await connectToDB();

    const addStore = new Store({
      store_name: store_name,
      owner_name: owner_name,
      mobile: mobile,
      barangay: barangay,
      municipality: municipality,
      active: active,
    });

    await addStore.save();

    console.log('Store data saved');

    return new NextResponse('Store add successfully')

  } catch (error) {

    console.error(error);

    return new Response(JSON.stringify({ error: 'An error occurred while processing your request' }), {

      status: 500,

    });
  }
}

