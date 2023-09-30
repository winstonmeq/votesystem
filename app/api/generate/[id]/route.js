

import Generate from "@/models/Generate";
import { connectToDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";




export async function GET(request, {params}) {

    const id = params.id
  
    try {
   
      console.log('generate id', id)
       
     await connectToDB();
  
     const getdata = await Generate.aggregate([
      {
        $match: {
          _id: new ObjectId(id), // Match the document with the specified id
        },
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
          barangay:1,
          status:1,
          active:1
        },
      },

    ]).exec();

    if (getdata.length === 0) {
      // Handle the case where no documents were found
      return NextResponse.json('No matching document found');
    }

      
      return NextResponse.json(getdata)
       
  
    } catch (error) {
    
      return NextResponse.json('erro database', error);
  
  
    } 
  }
  







export async function PATCH(request, { params }) {
  try {
    const id = params.id;

    const { active } = await request.json();

    console.log(params.id, active);

    await connectToDB();

    const updateData = await Generate.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!updateData) {
      return NextResponse.json('failed to update')
    } else {
      return NextResponse.json('Generate successfully updated')
    }
  } catch (error) {
    return new Response("error");
  }
}
