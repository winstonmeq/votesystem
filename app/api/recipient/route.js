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



// export async function GET(request) {


//   try {
//     // Retrieve the user's session
//    const session = await getServerSession({request });

//    console.log(session)
//     // Check if the user is authenticated

    
//     // if (!session) {
//     //   return new Response('Unauthorized', { status: 401 });
//     // }

//     // Your authentication logic here, e.g., checking roles or permissions

//     await connectToDB();

//     const getdata = await Recipient.find({}).exec();
//     return NextResponse.json(getdata);

//   } catch (error) {
//     console.error('GET Error:', error);
//     return new Response('GET Error');
//   }
// }




