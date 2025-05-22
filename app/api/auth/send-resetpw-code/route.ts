import { NextRequest, NextResponse } from "next/server";
import sendVerificationCode from "@/domains/auth/utils/sendVerificationCode";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "이메일이 없어요.", ok: false },
        { status: 422 }
      );
    }

    const result = await sendVerificationCode(email, "resetPw");

    return NextResponse.json(
      { message: result.message, ok: result.success },
      { status: result.status }
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
