import dbConnect from "@/conn/dbconnect";
import Voter from "@/models/Voter";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";



export async function GET(request, {params}) {

  

  try {

 
   
     
    await connectToDB();

    const getdata = await Voter.aggregate([
      {
        $match : {
            purok:'Purok3'
        },       

      },{
        $group:{

          _id:'$purok',
          //total:{$sum: {$cond:[{$eq:['$member',1]},'$member',0]}},
          member_yes:{$sum:'$member'},
          total:{$push:'$member'}

          
        }
      }
    ]).exec();
    
    //return new Response(JSON.stringify(getdata))

    return NextResponse.json(getdata)
     

  } catch (error) {
  
   return new Response('Error nih pre!');

  } 
}


