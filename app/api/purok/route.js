import dbConnect from "@/conn/dbconnect";
import Purok from "@/models/Purok";
import { connectToDB } from "@/utils/database";


export async function GET(request) {

  try {

    await connectToDB();

    const getdata = await Purok.find({}).exec();
    
    return new Response(JSON.stringify(getdata))
     

  } catch (error) {
  
   return new Response('Error nih pre!');

  } 
}



export async function POST(request) {

  try {

    const { PName,Coordinator , Phone, totalVote }= await request.json();

    console.log(PName,Coordinator , Phone, totalVote)

   await connectToDB();

    const addPurok = new Purok({
        PName:PName,
        Coordinator:Coordinator , 
        Phone:Phone, 
        totalVote:totalVote, 
        })
    
    await addPurok.save();

    
    console.log('Purok save')

    return new Response(JSON.stringify('add Purok successfully'))
     


  } catch (error) {
  
   return new Response('Error nih pre!');

  } 
}

