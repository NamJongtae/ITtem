import { emailHTML } from "@/lib/emailHTML";
import { getEmailVerifyNumber, saveEmailVerifyNumber } from "@/lib/api/redis";
import { smtpTransport } from "@/lib/server";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const verfiyCode = uuid().substring(0,6).toUpperCase();
    const { email } = req.body;

    const html = emailHTML(verfiyCode);
    const mailOptions = {
      from: process.env.NEXT_SECRET_SMTP_USER,
      to: email,
      subject: "잇템 회원가입 인증 메일입니다.",
      html,
    };

    try {
      const data = await getEmailVerifyNumber(email);
      if (data && parseInt(data.count) > 5) {
        res.status(422).json({
          message: "재요청 시도가 많아 1시간 동안 요청이 제한됩니다.",
        });
        return;
      }
      await new Promise((resolve, reject) => {
        smtpTransport.sendMail(mailOptions, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      });
      if (data) {
        await saveEmailVerifyNumber(
          email,
          verfiyCode,
          parseInt(data.count) + 1,
          parseInt(data.count) >= 4 ? 60 * 60 : 60 * 3 + 10
        );
      } else {
        await saveEmailVerifyNumber(email, verfiyCode);
      }
      res
        .status(200)
        .json({ message: "메일로 인증번호가 전송되었습니다.", ok: true });
    } catch (error) {
      console.log(error);
      res.status(422).json({
        message: "인증번호 전송에 실패하였습니다.",
        ok: false,
      });
    }
  }
}
