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
        },
      },
      
    ]).exec();

    return NextResponse.json(getdata);

  } catch (error) {

    return NextResponse.json('error')

  }
}

  





export async function POST(request) {
  try {
    const { distributionId,storeId, purok_id } = await request.json();

    console.log('post Generate api data', { distributionId, storeId, purok_id });

    await connectToDB();

    const getdata = await Voter.find({ purok: purok_id, member: 1 }).exec();

    for (const item of getdata) {
      const addGenerate = new Generate({
        distribution_id: distributionId,
        voter_id: item._id,
        storeId:storeId,
        municipality: 'Pres.Roxas',
        barangay: item.purok,
        active:'yes',
        status:'ready'
      });

      try {
        await addGenerate.save();

      } catch (error) {

        console.error('Error Generating Data:', error);
        // Handle the error as needed (e.g., return an error response)

      }
    }

    return NextResponse('Success');

  } catch (error) {
    return new Response('POST Error nih pre!');
  }
}
