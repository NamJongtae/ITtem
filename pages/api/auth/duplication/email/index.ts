import connectToDB from "@/lib/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email } = req.body;
    const client = await connectToDB();
    const db = client.db("auth");
    const isDuplication = await db.collection("user").findOne({ email });
    client.close();
    if (isDuplication) {
      res
        .status(401)
        .json({ message: "이미 사용중인 이메일입니다.", ok: false });

      return;
    }
    res.status(200).json({ message: "사용 가능한 이메일입니다.", ok: true });
  }
}
