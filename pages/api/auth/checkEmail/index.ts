import dbConnect from "@/lib/db";
import User from "@/lib/db/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(422).json({ message: "이메일이 없어요." });
        return;
      }

      await dbConnect();
      const user = await User.findOne({ email });

      if (!user) {
        res.status(401).json({ message: "존재하지 않는 이메일이에요." });
        return;
      }

      res.status(200).json({ message: "존재하는 이메일이에요." });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "이메일 확인에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
  else {
    res.status(405).json({ message: "잘못된 접근이에요." });
  }
}
