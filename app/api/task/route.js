

import Voter from "@/models/Voter";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";


export async function GET(request) {

  try {


    await connectToDB();

    
    const getdata = await Voter.aggregate([
   
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
            createdAt: 1, // Sort by the _id field in ascending order
          },
        },
        
      ]).exec();


      if(!getdata) { 

            return NextResponse.json("Failed to fetch")

      }else {

        return NextResponse.json(getdata)


      }

    
    //return new Response(JSON.stringify(getdata))
     

  } catch (error) {
  
   return new Response('GET Error nih pre!');

  } 
}



