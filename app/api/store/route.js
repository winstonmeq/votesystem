

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


    const { store_name, owner_name , mobile, barangay, municipality, active} = await request.json();

    console.log('checking store api data',{store_name,owner_name , mobile, barangay, municipality, active})


    await connectToDB();

    const addStore = new Store({
        store_name:store_name,
        owner_name:owner_name, 
        mobile: mobile,
        barangay:barangay, 
        municipality:municipality, 
        active:active, 
        })
    
    await addStore.save();

    
    console.log('Store data save')

    return new Response(JSON.stringify('add Store successfully'))
    

  } catch (error) {
  
   return new Response('POST Error nih pre!');

  } 
}

