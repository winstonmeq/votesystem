import Voter from "@/models/Voter";
import Recipient from "@/models/Recipient";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";




export async function GET(request) {


  try {
    // Retrieve the user's session
   const session = await getServerSession({request });

   console.log(session)
    // Check if the user is authenticated

    
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Your authentication logic here, e.g., checking roles or permissions

    await connectToDB();
    const getdata = await Recipient.find({}).exec();
    return NextResponse.json(getdata);
  } catch (error) {
    console.error('GET Error:', error);
    return new Response('GET Error');
  }
}

export async function POST(request) {
  try {
    // Retrieve the user's session
    const session = await getSession({ req: request });


    // Check if the user is authenticated
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Your authentication logic here, e.g., checking roles or permissions

    const { id, purok_id, distribution_name } = await request.json();
    console.log('Checking distribution api data', { id, purok_id, distribution_name });
    await connectToDB();
    const getdata = await Voter.find({ purok: purok_id }).exec();
    for (const item of getdata) {
      const addRecipient = new Recipient({
        distribution_id: id,
        distribution_name: distribution_name,
        voter_id: item._id,
        voter_name: item.fname,
        municipality: 'Pres.Roxas',
        barangay: item.purok,
      });
      try {
        await addRecipient.save();
      } catch (error) {
        console.error('Error saving Recipient:', error);
        // Handle the error as needed (e.g., return an error response)
      }
    }
    return NextResponse.json({ message: 'Ok result' });
  } catch (error) {
    console.error('POST Error:', error);
    return new Response('POST Error');
  }
}
