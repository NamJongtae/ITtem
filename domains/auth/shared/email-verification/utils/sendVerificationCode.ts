import { emailHTML } from "@/domains/auth/shared/email-verification/utils/emailHTML";
import { EmailVerificationType } from "../types/emailVerificationTypes";
import { v4 as uuid } from "uuid";
import getEmailVerificationCode from "./getEmailVerificationCode";
import saveEmailVerificationCode from "./saveEmailVerificationCode";
import {
  VERIFICATION_EMAIL_BLOCK_EXP,
  VERIFICATION_EMAIL_EXP
} from "../../common/constants/constansts";
import getSmtpTransport from "./getSmtpTransport";

export default async function sendVerificationCode(
  email: string,
  type: EmailVerificationType
) {
  const verifyCode = uuid().substring(0, 6).toUpperCase();

  const html = emailHTML(verifyCode, type);
  const mailOptions = {
    from: process.env.NEXT_SECRET_SMTP_USER,
    to: email,
    subject:
      type === "resetPw"
        ? "ITtem 비밀번호 찾기 인증 메일입니다."
        : "ITtem 회원가입 인증 메일입니다.",
    html
  };

  const data = await getEmailVerificationCode(email, type);
  if (data && parseInt(data.count) >= 10) {
    return {
      success: false,
      status: 403,
      message:
        "인증메일 전송, 인증 일일 시도 횟수를 초과하여\n24시간 동안 요청이 제한되요."
    };
  }

  await new Promise((resolve, reject) => {
    getSmtpTransport()
      .then((smtpTransport) => {
        smtpTransport.sendMail(mailOptions, (err, response) => {
          if (err) reject(err);
          else resolve(response);
        });
      })
      .catch((error) => reject(error));
  });

  if (data) {
    await saveEmailVerificationCode(
      email,
      verifyCode,
      type,
      parseInt(data.count) + 1,
      parseInt(data.count) >= 9
        ? VERIFICATION_EMAIL_BLOCK_EXP
        : VERIFICATION_EMAIL_EXP
    );
  } else {
    await saveEmailVerificationCode(email, verifyCode, type);
  }

  return {
    success: true,
    status: 200,
    message: "메일로 인증번호가 전송됐어요."
  };
}
