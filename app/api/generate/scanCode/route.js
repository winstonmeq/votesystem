

import Generate from "@/models/Generate";
import { connectToDB } from "@/utils/database";
import { ObjectId } from "mongodb";




export async function POST(request) {


    try {
  
      
    const { voter_id, storeId } = await request.json();
  
    console.log('generate voter_id api', { voter_id, storeId});

    // Validate the incoming data (you can add more checks as needed)
    if (!storeId || !voter_id === undefined) {
      return new Response(JSON.stringify({ error: 'Invalid data provided' }), { status: 400 });
    }
       
      // Assuming connectToDB establishes a database connection
      await connectToDB();
       
 
      const getdata = await Generate.aggregate([
        {
          $match: {
            $and: [
              { voter_id: new ObjectId(voter_id) },
              { status: 'ready' },
              { active: 'Yes' },
              {storeId:new ObjectId(storeId)}
            ]
          }
        }, 
       
          
        {
          $lookup: {
            from: "stores", // Replace with the actual name of your Distribution collection
            localField: "storeId",
            foreignField: "_id",
            as: "store",
          },
        },
  
        {
          $lookup: {
            from: "distributions", // Replace with the actual name of your Distribution collection
            localField: "distribution_id",
            foreignField: "_id",
            as: "distribution",
          },
        },

        {
          $lookup: {
            from: "voters", // Replace with the actual name of your Distribution collection
            localField: "voter_id",
            foreignField: "_id",
            as: "voter",
          },
        },
  
  
  
        {
          $project: {
            _id: 1,
            store_name: "$store.store_name",
            distribution_name: "$distribution.distribution_name",
            voter_fname: "$voter.fname",
            voter_lname: "$voter.lname",
            status:1,
            active:1,
            barangay:1
            
          },
        },
  
  
       
       
      ]).exec();

      
  
    if (getdata.length === 0) {     

    return new Response(
          JSON.stringify({ status: 'failed' }) // Use 200 for success
        );

    } else {

        return new Response(
          JSON.stringify({ status: 'success', data: getdata }) // Use 200 for success
        );
    }




    
  } catch (error) {

    console.error(error);

    return new Response(JSON.stringify({ status: 'An error jud ' }), {

      status: 500,

    });
  }
}











  

// export async function POST(request) {


//   try {

    
//   const { voter_id } = await request.json();

//   console.log('recipient voter_id api', { voter_id});

//   // Validate the incoming data (you can add more checks as needed)
//   if (!voter_id === undefined) {
//     return new Response(JSON.stringify({ error: 'Invalid data provided' }), { status: 400 });
//   }
     
//     // Assuming connectToDB establishes a database connection
//     await connectToDB();

//     const getdata = await Generate.find({voter_id: voter_id, rec_status:'ready'}).exec();

//     if (getdata.length === 0) {     

//     return new NextResponse(
//           JSON.stringify({ status: 'failed' }) // Use 200 for success
//         );

//     } else {
//         return new Response(
//           JSON.stringify({ status: 'success', data: getdata }),
//           { status: 200 } // Use 200 for success
//         );
//     }




    
//   } catch (error) {

//     console.error(error);

//     return new Response(JSON.stringify({ error: 'An error occurred while processing your request' }), {

//       status: 500,

//     });
//   }
// }

