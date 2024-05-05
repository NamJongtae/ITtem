import { deleteToken } from "@/lib/api/redis";
import dbConnect from "@/lib/db";
import { User } from "@/lib/db/schema";
import { checkAuthorization } from "@/lib/server";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const isValidAuth = await checkAuthorization(req, res);

      if (!isValidAuth.isValid) {
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }

      const { email } = req.body;

      await dbConnect();

      const dbUserData = await User.findOne({
        email,
      });

      await deleteToken(dbUserData?.uid || "", "accessToken");
      await deleteToken(dbUserData?.uid || "", "refreshToken");
      res.status(200).json({ message: "성공적으로 토큰이 삭제됬어요." });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "토큰 삭제에 실패했어요.",
      });
    }
  }
}
