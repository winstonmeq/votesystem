

import Store from "@/models/Store";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";





export async function GET(request, {params}) {

  const id = params.id

  try {
 
    console.log(id)
     
   await connectToDB();

    const getdata = await Store.find({_id:id}).exec();
    

    return NextResponse.json(getdata)
     

  } catch (error) {
  
   return new Response('error');

  } 
}



export async function PATCH(request, {params}) {

  const {store_name, owner_name, mobile, barangay, municipality, active} = await request.json();
 
   try {
  
     console.log(params.id, store_name, owner_name, mobile, barangay, municipality, active)
      
    await connectToDB();
 
 
     const updateStore = await Store.findByIdAndUpdate(
       params.id,
       { store_name, owner_name, mobile, barangay, municipality, active },
       { new: true }
     );
     
     if (!updateStore) {

       return new Response('Store not found', { status: 404 });
       
     }
     
     return NextResponse.json('Store Successfully updated')      
 
      
 
   } catch (error) {
   
    return new Response('error');
 
   }  
 }
