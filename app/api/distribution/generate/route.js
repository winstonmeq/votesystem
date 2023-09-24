import Voter from "@/models/Voter";
import Recipient from "@/models/Recipient";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";

export async function POST(request) {
  try {
    const { id, purok_id, distribution_name } = await request.json();

    console.log('checking distribution api data', { id, purok_id, distribution_name });

    await connectToDB();

    const getdata = await Voter.find({ purok: purok_id, member: 1 }).exec();

    for (const item of getdata) {
      const addRecipient = new Recipient({
        distribution_id: id,
        distribution_name: distribution_name,
        voter_id: item._id,
        voter_name: item.fname +',' +item.lname,
        municipality: 'Pres.Roxas',
        barangay: item.purok,
        active:'yes',
        rec_status:'ready'
      });

      try {
        await addRecipient.save();
      } catch (error) {
        console.error('Error saving Recipient:', error);
        // Handle the error as needed (e.g., return an error response)
      }
    }

    return NextResponse('Ok result');
  } catch (error) {
    return new Response('POST Error nih pre!');
  }
}
