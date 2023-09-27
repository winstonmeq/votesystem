

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
          distribution_name: "$distribution.distribution_name"
        },
      },


     
     
    ]).exec();


    

        return NextResponse.json(getdata); //pag nextjs page ang gamit mao nih ang json response pag API sa mobile lahi pud.. katong isa nga response
                                            //ang reason abih.. dile ma display sa datalist nga gamit ang datatable.. kaya mao nih dapat. pag nextjs to nextjs

                                       

  } catch (error) {

    console.error(error);

    return NextResponse.json('errrorrrr')

  }
}

