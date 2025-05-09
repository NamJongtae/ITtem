import { getHasdPassword } from "@/lib/api/auth";
import { deleteEmailVerificationCode, getVerifiedEmail } from "@/lib/api/redis";
import dbConnect from "@/lib/db/db";
import User from "@/lib/db/models/User";
import { LoginType } from "@/types/auth-types";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    await dbConnect();

    if (!email || !password) {
      return new NextResponse(
        JSON.stringify({ message: "유효하지 않은 값이 있어요." }),
        { status: 422 }
      );
    }

    const user = await User.findOne({ email });

    if (user.loginType !== LoginType.EMAIL) {
      return new NextResponse(
        JSON.stringify({
          message:
            "소셜 로그인은 해당 소셜 홈페이지에서 비밀번호를 변경해주세요."
        }),
        { status: 403 }
      );
    }

    const isEmailVerification = await getVerifiedEmail(email, "resetPw");
    if (!isEmailVerification) {
      return new NextResponse(
        JSON.stringify({ message: "인증되지 않은 이메일입니다." }),
        { status: 401 }
      );
    }

    const hashedPassword = await getHasdPassword(password);

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

    await deleteEmailVerificationCode(email, "resetPw");

    return new NextResponse(
      JSON.stringify({ message: "비밀번호가 변경되었어요." }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        message: "비밀번호 변경에 실패하였습니다\n잠시 후 다시 시도해주세요."
      }),
      { status: 500 }
    );
  }
}
