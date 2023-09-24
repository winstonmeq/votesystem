import Recipient from "@/models/Recipient";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";



export async function GET(request) {

    try {
  
  
      await connectToDB();
  
      const getdata = await Recipient.find({}).exec();
  
      return NextResponse.json(getdata)
      
      
  
    } catch (error) {
    
     return new Response('GET Error nih pre!');
  
    } 
  }
  




