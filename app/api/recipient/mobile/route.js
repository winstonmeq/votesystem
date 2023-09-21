

import Recipient from "@/models/Recipient";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";




export async function POST(request) {


    try {
  
      
    const { voter_id } = await request.json();
  
    console.log('recipient voter_id api', { voter_id});

    // Validate the incoming data (you can add more checks as needed)
    if (!voter_id === undefined) {
      return new Response(JSON.stringify({ error: 'Invalid data provided' }), { status: 400 });
    }
  
     
      // Assuming connectToDB establishes a database connection
      await connectToDB();
  
      const getdata = await Recipient.find({voter_id: voter_id}).exec();
  
      if (getdata.length === 0) {

      return new NextResponse(
            JSON.stringify({ status: 'failed' }) // Use 200 for success
          );

      } else {
          return new Response(
            JSON.stringify({ status: 'success', data: getdata }),
            { status: 200 } // Use 200 for success
          );
      }
    } catch (error) {
  
      console.error(error);
  
      return new Response(JSON.stringify({ error: 'An error occurred while processing your request' }), {
  
        status: 500,
  
      });
    }
  }
  
  