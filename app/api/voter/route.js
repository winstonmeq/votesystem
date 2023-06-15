

import dbConnect from "@/conn/dbconnect";
import Voter from "@/models/Voter";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";


export async function GET(request) {

  try {

    //await dbConnect();

    await connectToDB();

    const getdata = await Voter.find({}).exec();

    return NextResponse(getdata)
    
    //return new Response(JSON.stringify(getdata))
     

  } catch (error) {
  
   return new Response('GET Error nih pre!');

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

