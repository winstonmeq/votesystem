import dbConnect from "@/conn/dbconnect";
import Voter from "@/models/Voter";
import Log from "@/models/Log";

export async function GET(request) {

  try {

    await dbConnect();

    const getdata = await Voter.find({}).exec();
    
    return new Response(JSON.stringify(getdata))
     

  } catch (error) {
  
   return new Response('Error nih pre!');

  } 
}


export async function POST(request) {

  try {

    const { fname, lname, position, address}= await request.json();

    console.log(fname, lname, position, address)

    await dbConnect();

    const addUser = new Voter({
      fname:fname, 
      lname:lname, 
      position:position, 
      address:address})
    
    await addUser.save();

    
    console.log('Voter save')

    return new Response(JSON.stringify('add Voter successfully'))
     


  } catch (error) {
  
   return new Response('Error nih pre!');

  } 
}

