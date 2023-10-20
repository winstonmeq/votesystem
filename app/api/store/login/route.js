

import Store from "@/models/Store";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";






export async function POST(request) {


    try {
  
      
    const { mobile } = await request.json();
  
    console.log('store login API data', { mobile});
  
    // Validate the incoming data (you can add more checks as needed)
    if (!mobile === undefined) {
      return new Response(JSON.stringify({ error: 'Invalid data provided' }), { status: 400 });
    }
  
     
      // Assuming connectToDB establishes a database connection
      await connectToDB();
  
      const getdata = await Store.find({mobile: removemobile}).exec();
  
      if (getdata.length === 0) {

      return new Response(
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
  
  
