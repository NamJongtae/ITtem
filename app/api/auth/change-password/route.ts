import mongoose from "mongoose";
import dbConnect from "@/shared/common/utils/db/db";
import User from "@/domains/auth/shared/common/models/User";
import checkAuthorization from "@/domains/auth/shared/common/utils/checkAuthorization";
import { LoginType } from "@/domains/auth/signin/types/signinTypes";
import { NextRequest, NextResponse } from "next/server";
import hashPassword from "@/domains/auth/shared/common/utils/hashPassoword";
import comparePassword from "@/domains/auth/shared/common/utils/comparePassword";
import * as Sentry from "@sentry/nextjs";

export async function PATCH(req: NextRequest) {
  try {
    const { password, currentPassword } = await req.json();

    await dbConnect();

    if (!currentPassword || !password) {
      return new NextResponse(
        JSON.stringify({ message: "유효하지 않은 값이 있어요." }),
        { status: 422 }
      );
    }

    const isValidAuth = await checkAuthorization();

    if (!isValidAuth.isValid) {
      return new NextResponse(
        JSON.stringify({ message: isValidAuth.message }),
        { status: 401 }
      );
    }

    const myUid = isValidAuth?.auth?.uid as string;

    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(myUid)
    });

    if (user.loginType !== LoginType.EMAIL) {
      return new NextResponse(
        JSON.stringify({
          message:
            "소셜 로그인은 해당 소셜 홈페이지에서 비밀번호를 변경해주세요."
        }),
        { status: 403 }
      );
    }

    const isPasswordVerification = await comparePassword(
      currentPassword,
      user?.password || ""
    );

    if (!isPasswordVerification) {
      return new NextResponse(
        JSON.stringify({ message: "기존 비밀번호가 일치하지 않아요." }),
        { status: 401 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const result = await User.updateOne(
      { _id: new mongoose.Types.ObjectId(myUid) },
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
