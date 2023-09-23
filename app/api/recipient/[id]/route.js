import Recipient from "@/models/Recipient";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";


  
export async function PATCH(request, {params}) {

   
     try {

    
     const {active} = await request.json();


    
       console.log(params.id, active)
        
      await connectToDB();
   
   
       const updatedVoter = await Recipient.findByIdAndUpdate(
         params.id,
         { active },
         { new: true }
       );
       
       if (!updatedVoter) {
         return new Response('Recipient not found', { status: 404 });
       }
       
     return NextResponse.json('Successfully updated')      
   
        
   
     } catch (error) {
     
      return new Response('error');
   
     }  
   }
  
    