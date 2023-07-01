
import Voter from "@/models/Voter";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";



export async function GET(request) {
 

  try {
        
    await connectToDB();

    const get_progress = await Voter.aggregate([
     {
        $group:{

          _id:'$purok',
          //total:{$sum: {$cond:[{$eq:['$member',1]},'$member',0]}},
          member_yes:{$sum:'$member'},
          total:{$push:'$member'}

          
        }
      },
      { $sort: { purok: 1 } } 

    ]).exec();
    
    //return new Response(JSON.stringify(getdata))

    return NextResponse.json(get_progress)
     

  } catch (error) {
  
   return new Response('progress data error in query');

  } 
}



export async function POST(request) {

    try {
  
  
      const { fname, lname , age, position, prec_num, purok, member} = await request.json();
  
      console.log('check post voter data',{fname, lname})
  
  
      await connectToDB();
  
      const addVoter = new Voter({
          fname:fname,
          lname:lname , 
          age: age,
          position:position, 
          prec_num:prec_num, 
          purok:purok, 
          member:member})
      
      await addVoter.save();
  
      
      console.log('Voter save')
  
      return new Response(JSON.stringify('add Voter successfully'))
      
  
    } catch (error) {
    
     return new Response('POST Error nih pre!');
  
    } 
  }
  
  


