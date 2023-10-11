import Voter from "@/models/Voter";
import Generate from "@/models/Generate";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";





export async function GET(request) {
  try {
    await connectToDB();

    const getdata = await Generate.aggregate([
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
          from: "voters", // Replace with the actual name of your Voter collection
          localField: "voter_id",
          foreignField: "_id",
          as: "voter",
        },
      },
      {
        $lookup: {
          from: "stores", // Replace with the actual name of your Store collection
          localField: "storeId",
          foreignField: "_id",
          as: "store",
        },
      },
      {
        $sort: {
          createdAt: -1
        }
      },
    //   {
    //     $project: {
    //       distribution: { $arrayElemAt: ["$distribution", 0] },
    //       voter: { $arrayElemAt: ["$voter", 0] },
    //       store: { $arrayElemAt: ["$store", 0] },
    //       active: 1,
    //       status: 1,
    //     },
    //   },

    {
        $project: {
          distribution_name: "$distribution.distribution_name", // Use "$distribution.name" to access the "name" field in the "distribution" object
          voter_fname: "$voter.fname",
          voter_lname:"$voter.lname",
          store_name: "$store.store_name", // Use "$store.name" to access the "name" field in the "store" object
          municipality: 1,
          barangay: 1,
          active: 1,
          status: 1,
          createdAt: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt"
            }
          }
        },
      },
      
    ]).exec();


    const dataWithRowIndex = getdata.map((item, index) => ({
      rowNum: index + 1, // Add 1 to start indexing from 1
      ...item, // Convert Mongoose document to a plain object
    }));



    return NextResponse.json(dataWithRowIndex);

  } catch (error) {

    return NextResponse.json('error')

  }
}








export async function POST(request) {
  try {
    const { distributionId, storeId, purok_id, batchSize = 50 } = await request.json();

    console.log('post Generate api data', { distributionId, storeId, purok_id });

    await connectToDB();

    const totalCount = await Voter.countDocuments({ purok: purok_id, member: 'Yes' });

    console.log('Total rows to process:', totalCount);

    let processedCount = 0;
    let currentPage = 1;

    while (processedCount < totalCount) {
      const getdata = await Voter.find({ purok: purok_id, member: 'Yes' })
        .skip((currentPage - 1) * batchSize)
        .limit(batchSize)
        .exec();

      console.log(`Processing page ${currentPage}, ${getdata.length} items`);

      for (const item of getdata) {
        const addGenerate = new Generate({
          distribution_id: distributionId,
          voter_id: item._id,
          storeId: storeId,
          municipality: 'Pres.Roxas',
          barangay: item.purok,
          active: 'Yes',
          status: 'ready'
        });

        await addGenerate.save();
        processedCount++;
      }

      currentPage++;
    }

    return NextResponse.json('Generate add successfully');
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json('POST Error nih pre!');
  }
}




  

// export async function POST(request) {

//   try {

//     const { distributionId,storeId, purok_id } = await request.json();
    

//     console.log('post Generate api data', { distributionId, storeId, purok_id });

//     await connectToDB();

//     const getdata = await Voter.find({ purok: purok_id, member: 'Yes' }).exec();

//     console.log(getdata.length)

//     for (const item of getdata) {

//       console.log('Processing item:', item);


//       const addGenerate = new Generate({
//         distribution_id: distributionId,
//         voter_id: item._id,
//         storeId:storeId,
//         municipality: 'Pres.Roxas',
//         barangay: item.purok,
//         active:'Yes',
//         status:'ready'
//       });

    
//       await addGenerate.save();
   
//     }

//     return NextResponse.json('Generate add successfully')


//   } catch (error) {

//     console.error('Error:', error);

//     return NextResponse.json('POST Error nih pre!');
//   }
// }




// ayaw lng nih eh delete....


// export async function POST(request) {
//   try {
//     const { distributionId, storeId, purok_id } = await request.json();
//     console.log('post Generate api data', { distributionId, storeId, purok_id });

//     await connectToDB();

//     const getdata = await Voter.find({ purok: purok_id, member: 'Yes' }).exec();
//     console.log(getdata.length);

//     for (let i = 0; i < getdata.length; i++) {
//       const item = getdata[i];
//       console.log('Processing item:', item);

//       const addGenerate = new Generate({
//         distribution_id: distributionId,
//         voter_id: item._id,
//         storeId: storeId,
//         municipality: 'Pres.Roxas',
//         barangay: item.purok,
//         active: 'Yes',
//         status: 'ready'
//       });

//       await addGenerate.save();
//     }

//     return NextResponse.json('Generate add successfully');
//   } catch (error) {
//     console.error('Error:', error);
//     return NextResponse.json('POST Error nih pre!');
//   }
// }

















