import dbConnect from "@/conn/dbconnect";
import Purok from "@/models/Purok";


export async function GET(request) {

  try {

    await dbConnect();

    const getdata = await Purok.find({}).exec();
    
    return new Response(JSON.stringify(getdata))
     

  } catch (error) {
  
   return new Response('Error nih pre!');

  } 
}



export async function POST(request) {

  try {

    const { PName,Coordinator , Phone, totalVote, RedBox, BlueBox, GreenBox}= await request.json();

    console.log(PName,Coordinator , Phone, totalVote, RedBox, BlueBox, GreenBox)

    await dbConnect();

    const addPurok = new Purok({
        PName:PName,
        Coordinator:Coordinator , 
        Phone:Phone, 
        totalVote:totalVote, 
        RedBox:RedBox, 
        BlueBox:BlueBox, 
        GreenBox:GreenBox})
    
    await addPurok.save();

    
    console.log('Purok save')

    return new Response(JSON.stringify('add Purok successfully'))
     


  } catch (error) {
  
   return new Response('Error nih pre!');

  } 
}

