import Recipient from "@/models/Recipient";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";


  
export async function PATCH(request, {params}) {

   
     try {

    
     const {status} = await request.json();

    
       console.log(params.id, status)
        
      await connectToDB();
   
   
       const updateData = await Recipient.findByIdAndUpdate(
         params.id,
         { status },
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
  
    