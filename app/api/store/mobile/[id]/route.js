

import Generate from "@/models/Generate";
import { connectToDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";





export async function GET(request, {params}) {

  const storeId = params.id
 

  try {

   
  console.log('store id api', {storeId});

  // Validate the incoming data (you can add more checks as needed)
  if (!storeId === undefined) {
    return NextResponse({ error: 'Invalid data provided' }, { status: 400 });
  }
     
    // Assuming connectToDB establishes a database connection
    await connectToDB();


    const getdata = await Generate.aggregate([
      {
        $match: {
          'storeId': new ObjectId(storeId), // Filter documents with status equal to 'received'
        },
      },

     
      {
        $group: {
          _id: '$distribution_id',
          count: { $sum: 1 },
          documents: { $push: '$$ROOT' }, 
          receivedCount: {
            $sum: {
              $cond: {
                if: { $eq: ["$status", "received"] },
                then: 1,
                else: 0
              }
            }
          }
        }
      },

      {
        $lookup: {
          from: "stores", // Replace with the actual name of your Distribution collection
          localField: "documents.storeId",
          foreignField: "_id",
          as: "store",
        },
      },

      {
        $lookup: {
          from: "distributions", // Replace with the actual name of your Distribution collection
          localField: "_id",
          foreignField: "_id",
          as: "distribution",
        },
      },



      {
        $project: {
          _id: 1,
          receivedCount: 1,
          count: 1,
          storeName: "$store.store_name",
          distribution_name: "$distribution.distribution_name",
          dis_active:"$distribution.active"
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

    return NextResponse.json('errrorrrr')

  }
}

