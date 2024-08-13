import { emailHTML } from "@/lib/emailHTML";
import { getEmailVerifyCode, saveEmailVerifyCode } from "@/lib/api/redis";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { VERIFY_EMAIL_BLOCK_EXP, VERIFY_EMAIL_EXP } from "@/constants/constant";
import { getSmtpTransport } from "@/lib/server";

export async function POST(req: NextRequest) {
  try {
    const verfiyCode = uuid().substring(0, 6).toUpperCase();
    const { email, isFindPw } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "이메일이 없어요.", ok: false },
        { status: 422 }
      );
    }

    const html = emailHTML(verfiyCode, isFindPw);
    const mailOptions = {
      from: process.env.NEXT_SECRET_SMTP_USER,
      to: email,
      subject: isFindPw
        ? "ITtem 비밀번호 찾기 인증 메일입니다."
        : "ITtem 회원가입 인증 메일입니다.",
      html
    };

    const data = await getEmailVerifyCode(email, isFindPw);
    if (data && parseInt(data.count) >= 10) {
      return NextResponse.json(
        {
          message:
            "인증메일 전송, 인증 일일 시도 횟수를 초과하여\n24시간 동안 요청이 제한되요.",
          ok: false
        },
        { status: 403 }
      );
    }

    await new Promise((resolve, reject) => {
      getSmtpTransport()
        .then((smtpTransport) => {
          smtpTransport.sendMail(mailOptions, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve(response);
            }
          });
        })
        .catch((error) => {
          reject(error);
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

    return NextResponse.json(
      { message: "메일로 인증번호가 전송됬어요.", ok: true },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "인증번호 전송에 실패했어요.\n잠시후 다시 시도해주세요.",
        ok: false
      },
      { status: 500 }
    );
  }
}
