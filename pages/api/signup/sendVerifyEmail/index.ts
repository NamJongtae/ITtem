import { emailHTML } from "@/lib/emailHTML";
import { getEmailVerifyNumber, saveEmailVerifyNumber } from "@/lib/api/redis";
import { smtpTransport } from "@/lib/server";
import { NextApiRequest, NextApiResponse } from "next";

export function generateRandomNumber(min: number, max: number) {
  const randNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randNum;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const number = generateRandomNumber(111111, 999999);
    const { email } = req.body;

    const html = emailHTML(number);
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
          number,
          parseInt(data.count) + 1,
          parseInt(data.count) >= 4 ? 60 * 60 : 60 * 3 + 10
        );
      } else {
        await saveEmailVerifyNumber(email, number);
      }
      res.json({ message: "메일로 인증번호가 전송되었습니다.", ok: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "인증번호 전송에 실패하였습니다./n잠시 후 다시 시도해주세요.",
        ok: false,
      });
    }
  }
}
