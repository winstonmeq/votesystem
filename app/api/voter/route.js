

import Voter from "@/models/Voter";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";


export async function GET(request) {

  try {


    await connectToDB();

    const getdata = await Voter.find({}).sort({ createdAt: -1 }).exec();

    const dataWithRowIndex = getdata.map((item, index) => ({
      rowNum: index + 1, // Add 1 to start indexing from 1
      ...item.toObject(), // pag dot find gamit same sa taas dapat naa jud ang toObject() to convert pag aggregate eh remove ang toObject()
    }));




    return NextResponse.json(dataWithRowIndex)
    
    //return new Response(JSON.stringify(getdata))
     

  } catch (error) {
  
   return new Response('GET Error nih pre!');

  } 
}



export async function POST(request) {

  try {


    const { fname, lname , mobile, prec_num, purok, member, memberYes} = await request.json();

    console.log('check post voter data',{fname, lname})


    await connectToDB();

    const addVoter = new Voter({
        fname:fname,
        lname:lname , 
        mobile: mobile,
        prec_num:prec_num, 
        purok:purok, 
        member:member,
        memberYes:memberYes})
    
   await addVoter.save();

    
    console.log('Voter save')

    return new Response(JSON.stringify('add Voter successfully'))
    

  } catch (error) {
  
   return new Response('POST Error nih pre!');

  } 
}

