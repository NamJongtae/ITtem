import { getHasdPassword, verifyPassword } from "@/lib/api/auth";
import { getVerifiedEmail } from "@/lib/api/redis";
import dbConnect from "@/lib/db";
import User from "@/lib/db/models/User";
import { checkAuthorization } from "@/lib/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    try {
      const { email, password, currentPassword, isFindPw } = req.body;

      await dbConnect();

      if (isFindPw) {
        if (!email || !password) {
          res.status(422).json({ message: "유효하지 않은 값이있어요." });
          return;
        }

        const isVerifyEmail = await getVerifiedEmail(email, isFindPw);
        if (!isVerifyEmail) {
          res.status(401).json({ message: "인증되지 않은 이메일입니다." });
          return;
        }
      } else {
        if (!email || !password || !currentPassword) {
          res.status(422).json({ message: "유효하지 않은 값이 있어요." });
          return;
        }

        const isValidAuth = await checkAuthorization(req, res);

        if (!isValidAuth.isValid) {
          res.status(401).json({
            message: isValidAuth.message,
          });
          return;
        }

        const user = await User.findOne({ email });

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
      const result = await User.updateOne(
        { email },
        { $set: { password: hashedPassword } }
      );

      if (!result.acknowledged || result.modifiedCount === 0) {
        res.status(500).json({
          message: "비밀번호 변경에실패했어요.\n잠시 후 다시 시도해주세요.",
        });
        return;
      }

      res.status(200).json({ message: "비밀번호가 변경되었어요." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json("비밀번호 변경에 실패하였습니다\n잠시 후 다시 시도해주세요.");
    }
  }
}
