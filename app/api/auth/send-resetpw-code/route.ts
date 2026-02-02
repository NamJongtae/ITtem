import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { v4 as uuid } from "uuid";
import dbConnect from "@/shared/common/utils/db/db";
import EmailVerification from "@/domains/auth/signup/models/EmailVerification";
import EmailVerificationBlock from "@/domains/auth/signup/models/EmailVerificationBlock";
import { emailHTML } from "@/domains/auth/shared/email-verification/utils/emailHTML";
import getSmtpTransport from "@/domains/auth/shared/email-verification/utils/getSmtpTransport";
import {
  VERIFICATION_EMAIL_BLOCK_EXP,
  VERIFICATION_EMAIL_EXP
} from "@/domains/auth/shared/common/constants/constansts";
import { hashVerificationCode } from "@/domains/auth/signup/utils/hashVerificationCode ";

export async function POST(req: NextRequest) {
  try {
 const { email } = await req.json();
    const type = "resetPw" as const;

    if (!email) {
      return NextResponse.json(
        { message: "이메일이 없어요.", ok: false },
        { status: 422 }
      );
    }

    await dbConnect();

    const now = new Date();

    const blocked = await EmailVerificationBlock.findOne({
      email,
      type,
      blockedUntil: { $gt: now }
    }).select({ _id: 1 });

    if (blocked) {
      return NextResponse.json(
        {
          message:
            "인증메일 전송, 인증 일일 시도 횟수를 초과하여\n24시간 동안 요청이 제한되요.",
          ok: false
        },
        { status: 403 }
      );
    }

    const existing = await EmailVerification.findOne({
      email,
      type,
      expiresAt: { $gt: now }
    }).select({ count: 1 });

    const currentCount = existing?.count ?? 0;

    if (currentCount >= 10) {
      const blockedUntil = new Date(
        Date.now() + VERIFICATION_EMAIL_BLOCK_EXP * 1000
      );

      await EmailVerificationBlock.updateOne(
        { email, type },
        { $set: { blockedUntil }, $setOnInsert: { email, type } },
        { upsert: true }
      );

      return NextResponse.json(
        {
          message:
            "인증메일 전송, 인증 일일 시도 횟수를 초과하여\n24시간 동안 요청이 제한되요.",
          ok: false
        },
        { status: 403 }
      );
    }

    const verifyCode = uuid().substring(0, 6).toUpperCase();

    const html = emailHTML(verifyCode, type);
    const mailOptions = {
      from: process.env.NEXT_SECRET_SMTP_USER,
      to: email,
      subject: "ITtem 비밀번호 찾기 인증 메일입니다.",
      html
    };

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

    const nextCount = currentCount + 1;
    const expiresAt = new Date(Date.now() + VERIFICATION_EMAIL_EXP * 1000);

    const verificationCodeHash = hashVerificationCode(verifyCode);

    await EmailVerification.updateOne(
      { email, type },
      {
        $set: {
          email,
          type,
          verificationCodeHash,
          isVerified: false,
          count: nextCount,
          expiresAt
        }
      },
      { upsert: true }
    );

    if (nextCount >= 10) {
      const blockedUntil = new Date(
        Date.now() + VERIFICATION_EMAIL_BLOCK_EXP * 1000
      );

      await EmailVerificationBlock.updateOne(
        { email, type },
        { $set: { blockedUntil }, $setOnInsert: { email, type } },
        { upsert: true }
      );
    }

    return NextResponse.json(
      { message: "메일로 인증번호가 전송됐어요.", ok: true },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);

    return NextResponse.json(
      {
        message: "인증번호 전송에 실패했어요.\n잠시후 다시 시도해주세요.",
        ok: false
      },
      { status: 500 }
    );
  }
}
