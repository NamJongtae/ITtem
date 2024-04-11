import { getEmailVerifyNumber, saveVerifiedEmail } from "@/lib/api/redis";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, verifyCode } = req.body;
    const data = await getEmailVerifyNumber(email);
    if (verifyCode.toUpperCase() === data?.verifyCode) {
      await saveVerifiedEmail(email);
      res.status(200).json({ message: "인증이 완료되었습니다.", ok: true });
    } else {
      res.status(401).json({ message: "인증에 실패하였습니다.", ok: false });
    }
  }
}
