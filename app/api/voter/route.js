

import dbConnect from "@/conn/dbconnect";
import Voter from "@/models/Voter";
import { NextResponse } from "next/server";


export async function GET(request) {

  try {

    await dbConnect();

    const getdata = await Voter.find({}).exec();

    //return NextResponse(getdata)
    
    return new Response(JSON.stringify(getdata))
     

  } catch (error) {
  
   return new Response('GET Error nih pre!');

  } 
}



export async function POST(request) {

  try {


    const { fname, lname , age, position, prec_num, purok, member} = await request.json();

    console.log('check post voter data',{fname, lname})


    await dbConnect();

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

export async function PATCH(request, {params}) {

  const {fname,lname} = await request.json();
 
   try {
  
     console.log(fname,lname)
      
     await dbConnect();
     
     const updatedata = await Voter.findById(params.id);
 
     if (!updatedata) {
      
       return new Response("Voter not found", { status: 404 });
   }
 
   // Update the prompt with new data
   updatedata.fname = fname;
   updatedata.lname = lname;
 
   await updatedata.save();
 
     
   return NextResponse.json('Successfully updated')      
 
      
 
   } catch (error) {
   
    return new Response('error');
 
   } 
 }
