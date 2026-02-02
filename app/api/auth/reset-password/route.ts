import hashPassword from "@/domains/auth/shared/common/utils/hashPassoword";
import dbConnect from "@/shared/common/utils/db/db";
import User from "@/domains/auth/shared/common/models/User";
import { LoginType } from "@/domains/auth/signin/types/signinTypes";
import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import EmailVerification from "@/domains/auth/signup/models/EmailVerification";

export async function PATCH(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new NextResponse(
        JSON.stringify({ message: "유효하지 않은 값이 있어요." }),
        { status: 422 }
      );
    }

    await dbConnect();

    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "존재하지 않는 사용자입니다." }),
        { status: 404 }
      );
    }

    if (user.loginType !== LoginType.EMAIL) {
      return new NextResponse(
        JSON.stringify({
          message:
            "소셜 로그인은 해당 소셜 홈페이지에서 비밀번호를 변경해주세요."
        }),
        { status: 403 }
      );
    }

    const now = new Date();
    const verification = await EmailVerification.findOne({
      email,
      type: "resetPw",
      isVerified: true,
      expiresAt: { $gt: now }
    }).select({ _id: 1 });

    if (!verification) {
      return new NextResponse(
        JSON.stringify({ message: "인증되지 않은 이메일입니다." }),
        { status: 401 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const result = await User.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    if (!result.acknowledged || result.modifiedCount === 0) {
      return new NextResponse(
        JSON.stringify({
          message: "비밀번호 변경에 실패했어요.\n잠시 후 다시 시도해주세요."
        }),
        { status: 500 }
      );
    }

    await EmailVerification.deleteOne({ email, type: "resetPw" });

    return new NextResponse(
      JSON.stringify({ message: "비밀번호가 변경되었어요." }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    return new NextResponse(
      JSON.stringify({
        message: "비밀번호 변경에 실패하였습니다\n잠시 후 다시 시도해주세요."
      }),
      { status: 500 }
    );
  }
}
