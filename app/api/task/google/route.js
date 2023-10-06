import { NextApiRequest, NextApiResponse } from "next";
import { Generate } from "../../models/Generate";


export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "PATCH":
      try {
        const id = req.query.id;
        const { active } = await req.json();

        const updateData = await Generate.findByIdAndUpdate(
          id,
          { active },
          { new: true }
        );

        if (!updateData) {
          return res.status(400).json({ error: "Failed to update Generate" });
        }

        return res.status(200).json({ message: "Generate successfully updated" });
      } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
      }
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}