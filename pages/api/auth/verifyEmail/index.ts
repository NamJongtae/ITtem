import {
  getEmailVerifyCode,
  incrementVerifyEmailCounter,
  saveVerifiedEmail,
} from "@/lib/api/redis";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, verifyCode, isFindPw } = req.body;
    const data = await getEmailVerifyCode(email, isFindPw);

    if (data && parseInt(data.count, 10) >= 10) {
      res.status(403).json({
        message:
          "인증메일 전송, 인증 일일 시도 횟수를 초과하여\n24시간 동안 요청이 제한되요.",
        ok: false,
      });
      return;
    }
    try {
      await incrementVerifyEmailCounter(email, data?.count, isFindPw);
      if (verifyCode.toUpperCase() === data?.verifyCode) {
        await saveVerifiedEmail(email, isFindPw);
        res.status(200).json({ message: "인증이 완료됬어요.", ok: true });
      } else {
        res.status(401).json({
          message: "인증코드가 일치하지 않아요.",
          ok: false,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "인증에 실패했어요.\n잠시 후 다시 시도해주세요.",
        ok: false,
      });
    }
  }
}
