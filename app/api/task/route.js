

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













export async function POST(request) {

 
  try {

    const { task } = await request.json();

    // Validate the incoming data (you can add more checks as needed)
    if (!task === undefined) {
     return new Response(JSON.stringify({ error: 'Invalid data provided' }), { status: 400 });
   }
 


    await connectToDB();

    // const addDistribution = Distribution({
    //     distribution_name:distribution_name,
    //     target:target,
    //     type:type,        
    //     active:active, 
    //     })
    
    // await addDistribution.save();

    return NextResponse.json('task add successfully')
    

  } catch (error) {
  
   return NextResponse.json('POST Error nih pre!');

  } 
}



