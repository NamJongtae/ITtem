import dbConnect from "@/lib/db";
import { User } from "@/lib/db/schema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email } = req.body;

      await dbConnect();

      const isDuplication = await User.findOne({
        email: { $regex: new RegExp(email, "i") },
      });

      if (isDuplication) {
        res
          .status(401)
          .json({ message: "이미 사용중인 이메일입니다.", ok: false });

        return;
      }
      res.status(200).json({ message: "사용 가능한 이메일입니다.", ok: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "이메일 확인에 실패하였습니다.", ok: false });
    } 
  }
}
