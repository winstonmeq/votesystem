

import dbConnect from "@/conn/dbconnect";
import Voter from "@/models/Voter";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";


export async function GET(request) {

  try {

    //await dbConnect();

    await connectToDB();

    
    const getdata3 = await Voter.aggregate([
        // {
        //   $match : {
        //     purok:'Purok9'
        //   },       
  
        // },
        {
          $group:{
  
            _id:'$purok',
            //total:{$sum: {$cond:[{$eq:['$member',1]},'$member',0]}},
            member_yes:{$sum:'$memberYes'},
            total:{$push:'$memberYes'}
  
            
          }
        },
        {
          $sort: {
            _id: 1, // Sort by the _id field in ascending order
          },
        },
      ]).exec();

    return NextResponse.json(getdata3)
    
    //return new Response(JSON.stringify(getdata))
     

  } catch (error) {
  
   return new Response('GET Error nih pre!');

  } 
}



