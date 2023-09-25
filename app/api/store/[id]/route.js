

import Recipient from "@/models/Recipient";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";





export async function GET(request, {params}) {

 const id = params.id


  try {


  console.log('GET id api', {id});

  // Validate the incoming data (you can add more checks as needed)
  if (!id === undefined) {
    return NextResponse({ error: 'Invalid data provided' }, { status: 400 });
  }
     
    // Assuming connectToDB establishes a database connection
    await connectToDB();


    const getdata = await Recipient.aggregate([
      {
        $match: {
          'storeId': id, // Filter documents with status equal to 'received'
        },
      },
      {
        $group: {
          _id: '$distribution_name',
          count: { $sum: 1 },
          receivedCount: {
            $sum: {
              $cond: {
                if: { $eq: ["$rec_status", "received"] },
                then: 1,
                else: 0
              }
            }
          }
        }
      },

     
     
    ]).exec();


    

        return NextResponse.json(getdata); //pag nextjs page ang gamit mao nih ang json response pag API sa mobile lahi pud.. katong isa nga response
                                            //ang reason abih.. dile ma display sa datalist nga gamit ang datatable.. kaya mao nih dapat. pag nextjs to nextjs

                                       

  } catch (error) {

    console.error(error);

    return NextResponse.json('errrorrrr')

  }
}





// export async function GET(request, {params}) {

//   const id = params.id

//   try {
 
//     console.log(id)
     
//    await connectToDB();

//     const getdata = await Recipient.find({storeId:id}).exec();
    
//     return new Response(JSON.stringify(getdata))

     

//   } catch (error) {
  
//    return new Response('error');

//   } 
// }
  
  