import dbConnect from "@/conn/dbconnect";
import Distribution from "@/models/Distribution";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";


//query data single 
export async function GET(request, {params}) {

  const id = params.id

  try {
 
    console.log(id)
     
   await connectToDB();

    const getdata = await Distribution.find({_id:id}).exec();
    
    //return new Response(JSON.stringify(getdata))

    return NextResponse.json(getdata)
     

  } catch (error) {
  
   return new Response('error');

  } 
}





export async function PATCH(request, {params}) {

  const {distribution_name, type, target, active} = await request.json();
 
   try {
  
     console.log(params.id, distribution_name, type, target, active)
      
    await connectToDB();
 
 
     const updatedDistribution = await Distribution.findByIdAndUpdate(
       params.id,
       { distribution_name, type, target, active },
       { new: true }
     );
     
     if (!updatedDistribution) {
       return new Response('Distribution not found', { status: 404 });
     }
     
   return NextResponse.json('Distribution Successfully updated')      
 
      
 
   } catch (error) {
   
    return new Response('error');
 
   }  
 }




//delete data after query
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


