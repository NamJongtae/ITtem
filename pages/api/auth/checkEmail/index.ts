import { ERROR_MESSAGE } from "@/constants/constant";
import { DBClient } from "@/lib/database";
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

      await DBClient.connect();
      const db = DBClient.db("auth");
      const user = await db.collection("user").findOne({ email });

      if (!user) {
        res.status(401).json({ message: "존재하지 않는 이메일이에요."});
        return;
      }

      res.status(200).json({ message: "존재하는 이메일이에요." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: ERROR_MESSAGE });
    } finally {
      await DBClient.close();
    }
  }
}
