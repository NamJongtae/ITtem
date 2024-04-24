import { DBClient } from "@/lib/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { nickname } = req.body;
      await DBClient.connect();
      const db = DBClient.db("auth");
      const isDuplication = await db.collection("user").findOne({ nickname });
      
      if (isDuplication) {
        res
          .status(401)
          .json({ message: "이미 사용중인 닉네임입니다.", ok: false });

        return;
      }
      res.status(200).json({ message: "사용 가능한 닉네임입니다.", ok: true });
    } catch (error) {
      res
        .status(500)
        .json({ message: "닉네임 확인에 실패하였습니다.", ok: false });
    } finally {
      await DBClient.close();
    }
  }
}
