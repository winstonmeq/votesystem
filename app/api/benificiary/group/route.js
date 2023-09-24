

import Recipient from "@/models/Recipient";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";


export async function GET(request) {
  try {
    await connectToDB();

    const getdata = await Recipient.aggregate([
      {
        $group: {
          _id: '$distribution_name', // Group by the distribution_name field
          count: { $sum: 1 }, // Calculate the count for each group
          documents: { $push: '$$ROOT' }, // Store the documents in the group
        },
      },
      {
        $unwind: '$documents', // Unwind the documents array
      },
      {
        $match: {
          'documents.rec_status': 'received', // Filter documents with status equal to 'good'
        },
      },
      {
        $group: {
          _id: '$_id', // Group by the distribution_name field again
          totalreceived: { $sum: 1 }, // Calculate the count of 'good' statuses in each group
          //count: { $first: '$count' }, // Get the original count for the group
        },
      },
    ]).exec();

    return new Response(
      JSON.stringify({ status: 'success', data: getdata }),
      { status: 200 } // Use 200 for success
    );
  } catch (error) {

    return new Response(JSON.stringify({ error: 'An error occurred while processing your request' }), {
  
      status: 500,

    });

  }
}




export async function POST(request) {


  try {

    
  const { storeId } = await request.json();

  console.log('storeId api', {storeId});

  // Validate the incoming data (you can add more checks as needed)
  if (!storeId === undefined) {
    return new Response(JSON.stringify({ error: 'Invalid data provided' }), { status: 400 });
  }
     
    // Assuming connectToDB establishes a database connection
    await connectToDB();


    const getdata = await Recipient.aggregate([
      {
        $match: {
          'storeId': storeId, // Filter documents with status equal to 'received'
        },
      },
      {
        $group: {
          _id: '$distribution_name', // Group by the distribution_name field
          count: { $sum: 1 }, // Calculate the count for each group
          documents: { $push: '$$ROOT' }, // Store the documents in the group
        },
      },
      {
        $unwind: '$documents', // Unwind the documents array
      },
      {
        $match: {
          'documents.rec_status': 'received', // Filter documents with status equal to 'good'
        },
      },
      {
        $group: {
          _id: '$_id', // Group by the distribution_name field again
          totalreceived: { $sum: 1 }, // Calculate the count of 'good' statuses in each group
          //count: { $first: '$count' }, // Get the original count for the group
        },
      },
    ]).exec();


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



