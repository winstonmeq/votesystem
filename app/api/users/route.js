import dbConnect from "@/conn/dbconnect";
import User from "@/models/User";

export async function GET(request) {

  try {

    await dbConnect();

    const getdata = await User.find({}).exec();
    
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

    const addUser = new User({
      fname:fname, 
      lname:lname, 
      position:position, 
      address:address})
    
    await addUser.save();

    
    console.log('User save')

    return new Response(JSON.stringify('add User successfully'))
     


  } catch (error) {
  
   return new Response('Error nih pre!');

  } 
}

