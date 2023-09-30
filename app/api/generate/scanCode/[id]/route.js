import Generate from "@/models/Generate";
import { connectToDB } from "@/utils/database";

export async function PATCH(request, { params }) {
  try {
    const id = params.id;

    const { status } = await request.json();

    console.log(params.id, status);

    await connectToDB();

    const updateData = await Generate.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updateData) {
      return new Response(
        JSON.stringify({ status: "failed" }) // Use 200 for success
      );
    } else {
      return new Response(
        JSON.stringify({ status: "success" }) // Use 200 for success
      );
    }
  } catch (error) {
    return new Response("error jud pre");
  }
}
