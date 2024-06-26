import { emailHTML } from "@/lib/emailHTML";
import nodemailer from "nodemailer";
import { getEmailVerifyCode, saveEmailVerifyCode } from "@/lib/api/redis";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";
import { VERIFY_EMAIL_BLOCK_EXP, VERIFY_EMAIL_EXP } from "@/constants/constant";

export const smtpTransport = nodemailer.createTransport({
  service: "gamil",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.NEXT_SECRET_SMTP_USER,
    pass: process.env.NEXT_SECRET_SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const verfiyCode = uuid().substring(0, 6).toUpperCase();
    const { email, isFindPw } = req.body;

    const html = emailHTML(verfiyCode, isFindPw);
    const mailOptions = {
      from: process.env.NEXT_SECRET_SMTP_USER,
      to: email,
      subject: isFindPw
        ? "ITtem 비밀번호 찾기 인증 메일입니다."
        : "ITtem 회원가입 인증 메일입니다.",
      html,
    };

    try {
      const data = await getEmailVerifyCode(email, isFindPw);
      if (data && parseInt(data.count) >= 10) {
        res.status(403).json({
          message:
            "인증메일 전송, 인증 일일 시도 횟수를 초과하여\n24시간 동안 요청이 제한되요.",
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
        await saveEmailVerifyCode(
          email,
          verfiyCode,
          isFindPw,
          parseInt(data.count) + 1,
          parseInt(data.count) >= 9 ? VERIFY_EMAIL_BLOCK_EXP : VERIFY_EMAIL_EXP
        );
      } else {
        await saveEmailVerifyCode(email, verfiyCode, isFindPw);
      }
      res
        .status(200)
        .json({ message: "메일로 인증번호가 전송됬어요.", ok: true });
    } catch (error) {
      console.log(error);
      res.status(422).json({
        message: "인증번호 전송에 실패했어요.",
        ok: false,
      });
    }
  }
}
