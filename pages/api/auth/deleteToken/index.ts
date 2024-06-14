import { deleteToken } from "@/lib/api/redis";
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

      await dbConnect();

      const dbUserData = await User.findOne({
        email,
      });

      await deleteToken(dbUserData?._id || "", "accessToken");
      await deleteToken(dbUserData?._id || "", "refreshToken");
      res.status(200).json({ message: "성공적으로 토큰이 삭제됬어요." });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "토큰 삭제에 실패했어요.",
      });
    }
  }
  else {
    res.status(405).json({ message: "잘못된 접근이에요." });
  }
}
