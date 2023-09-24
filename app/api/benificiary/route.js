import Recipient from "@/models/Recipient";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";



export async function GET(request) {

    try {
  
  
      await connectToDB();
  
      const getdata = await Recipient.find({}).exec();
  
      return NextResponse.json(getdata)
      
      
  
    } catch (error) {
    
     return new Response('GET Error nih pre!');
  
    } 
  }
  



  

  export async function POST(request) {

 
    try {
  
      const { distribution_name, voter_name, rec_status , active} = await request.json();
  
      // Validate the incoming data (you can add more checks as needed)
      if (!distribution_name || !rec_status || !voter_name || active === undefined) {
       return new Response(JSON.stringify({ error: 'Invalid data provided' }), { status: 400 });
     }
   
  
      console.log('checking distribution api data',{distribution_name, voter_name, rec_status, active})
  
      await connectToDB();
  
      const addRecipient = Recipient({
          distribution_name:distribution_name, 
          voter_name:voter_name,           
          active:active, 
          rec_status:rec_status,
          })
      
      await addRecipient.save();
  
      return new NextResponse('Recipient add successfully')
      
  
    } catch (error) {
    
     return new NextResponse('POST Error nih pre!');
  
    } 
  }




