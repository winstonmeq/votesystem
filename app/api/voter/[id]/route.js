import dbConnect from "@/conn/dbconnect";
import Voter from "@/models/Voter";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";



export async function GET(request, {params}) {

  const id = params.id

  try {
 
    console.log(id)
     
   await connectToDB();

    const getdata = await Voter.find({_id:id}).exec();
    
    //return new Response(JSON.stringify(getdata))

    return NextResponse.json(getdata)
     

  } catch (error) {
  
   return new Response('error');

  } 
}




export async function PATCH(request, {params}) {

  const {fname, lname , mobile, prec_num, purok, member, memberYes} = await request.json();
 
   try {
  
     console.log(params.id, fname, lname , mobile, prec_num, purok, member, memberYes)
      
    await connectToDB();
 
 
     const updatedVoter = await Voter.findByIdAndUpdate(
       params.id,
       { fname, lname , mobile, prec_num, purok, member, memberYes },
       { new: true }
     );
     
     if (!updatedVoter) {

       return NextResponse.json('Member not found', { status: 404 });

     }
     
   return NextResponse.json('Member Successfully updated')      
 
      
 
   } catch (error) {
   
    return NextResponse.json('error');
 
   }  
 }



 

 export async function DELETE(request, { params }) {

  try {

    await dbConnect();

    const deleteResult = await Voter.findByIdAndDelete(params.id);

    if (deleteResult.deletedCount === 0) {
      return new Response('Voter not found', { status: 404 });
    }

    return new Response('Successfully deleted', { status: 200 });

  } catch (error) {

    return new Response('Error deleting voter', { status: 500 });

  }
}


