import getEmailVerificationCode from "@/domains/auth/shared/email-verification/utils/getEmailVerificationCode";
import incrementVerificationCounter from "@/domains/auth/shared/email-verification/utils/incrementVerificationCounter";
import saveVerifiedEmail from "@/domains/auth/shared/email-verification/utils/saveVerifiedEmail";
import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function POST(req: NextRequest) {
  const { email, verificationCode, type } = await req.json();
  const data = await getEmailVerificationCode(email, type);

  if (data && parseInt(data.count, 10) >= 10) {
    return NextResponse.json(
      {
        message:
          "인증메일 전송, 인증 일일 시도 횟수를 초과하여\n24시간 동안 요청이 제한되요.",
        ok: false
      },
      { status: 403 }
    );
  }
  try {
    await incrementVerificationCounter(email, data?.count, type);
    if (verificationCode.toUpperCase() === data?.verificationCode) {
      await saveVerifiedEmail(email, type);
      return NextResponse.json({ message: "인증이 완료됬어요.", ok: true });
    } else {
      return NextResponse.json(
        {
          message: "인증코드가 일치하지 않아요.",
          ok: false
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json(
      {
        message: "인증에 실패했어요.\n잠시 후 다시 시도해주세요.",
        ok: false
      },
      { status: 500 }
    );
  }
}
