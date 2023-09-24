

import Store from "@/models/Store";
import { connectToDB } from "@/utils/database";




export async function POST(request) {


    try {
  
      
    const { storeId } = await request.json();
  
    console.log('storeId api', { storeId});

    // Validate the incoming data (you can add more checks as needed)
    if (!storeId === undefined) {
      return new Response(JSON.stringify({ error: 'Invalid data provided' }), { status: 400 });
    }
       
      // Assuming connectToDB establishes a database connection
      await connectToDB();
  
      const getdata = await Store.find({_id: storeId}).exec();
  
      if (getdata.length === 0) {     

      return new Response(
            JSON.stringify({ status: 'not found' }) // Use 200 for success
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
  
