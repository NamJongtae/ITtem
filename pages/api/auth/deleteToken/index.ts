import { deleteToken } from "@/lib/api/redis";
import { DBClient } from "@/lib/database";
import { UserData } from "@/types/apiTypes";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email } = req.body;
      await DBClient.connect();
      const db = DBClient.db("auth");
      const collection = db.collection("user");
      const dbUserData = (await collection.findOne({
        email,
      })) as UserData | null;

      await deleteToken(dbUserData?.uid || "", "accessToken");
      await deleteToken(dbUserData?.uid || "", "refreshToken");
      res.status(200).json({ message: "성공적으로 토큰이 삭제됬어요." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "토큰 삭제에 실패했어요." });
    } finally {
      DBClient.close();
    }
  }
}
