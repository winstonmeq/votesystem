import Recipient from "@/models/Recipient";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";


  
export async function PATCH(request, {params}) {

     
     try {

    const id = params.id
    
     const {rec_status} = await request.json();

    
       console.log(params.id, rec_status)
        
      await connectToDB();
   
   
       const updateData = await Recipient.findByIdAndUpdate(
         id,
         { rec_status },
         { new: true }
       );
       
       if (!updateData) {
        
         return new Response('Recipient not found', { status: 404 });
       }
       
     return NextResponse.json('Successfully updated')      
   
        
   
     } catch (error) {
     
      return new Response('error');
   
     }  
   }
  
    