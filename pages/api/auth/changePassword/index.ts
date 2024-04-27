import { ERROR_MESSAGE } from "@/constants/constant";
import { getHasdPassword, verifyPassword } from "@/lib/api/auth";
import { getVerifiedEmail } from "@/lib/api/redis";
import { DBClient } from "@/lib/database";
import { UserData } from "@/types/apiTypes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, password, currentPassword, isFindPw } = req.body;

      await DBClient.connect();
      const db = DBClient.db("ITtem");

      if (isFindPw) {
        const isVerifyEmail = await getVerifiedEmail(email, isFindPw);
        if (!isVerifyEmail) {
          res.status(401).json({ message: "인증되지 않은 이메일입니다." });
          return;
        }
      } else {
        const user = (await db
          .collection("user")
          .findOne({ email })) as UserData | null;

        const isVerifyPassword = await verifyPassword(
          currentPassword,
          user?.password || ""
        );

        if (!isVerifyPassword) {
          res.status(401).json({ message: "기존 비밀번호가 일치하지 않아요." });
          return;
        }
      }

      const hashedPassword = await getHasdPassword(password);
      const result = await db
        .collection("user")
        .updateOne({ email }, { $set: { password: hashedPassword } });

      if (result.modifiedCount === 0) {
        res.status(500).json({
          message: "비밀번호 변경에실패했어요.\n잠시 후 다시 시도해주세요.",
        });
        return;
      }

      res.status(200).json({ message: "비밀번호가 변경되었어요." });
    } catch (error) {
      console.error(error);
      res.status(500).json(ERROR_MESSAGE);
    } finally {
      await DBClient.close();
    }
  }
}
