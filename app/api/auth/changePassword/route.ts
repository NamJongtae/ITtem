import { getHasdPassword, verifyPassword } from "@/lib/api/auth";
import { deleteEmailVerifyCode, getVerifiedEmail } from "@/lib/api/redis";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";
import User from "@/lib/db/models/User";
import { checkAuthorization } from "@/lib/server";
import { LoginType } from "@/types/authTypes";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const { email, password, currentPassword, isFindPw } = await req.json();

    await dbConnect();

    if (isFindPw) {
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
            message: "소셜 로그인은 해당 소셜 홈페이지에서 비밀번호를 변경해주세요.",
          }),
          { status: 403 }
        );
      }

      const isVerifyEmail = await getVerifiedEmail(email, isFindPw);
      if (!isVerifyEmail) {
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
            message: "비밀번호 변경에 실패했어요.\n잠시 후 다시 시도해주세요.",
          }),
          { status: 500 }
        );
      }
    } else {
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
        _id: new mongoose.Types.ObjectId(myUid),
      });

      if (user.loginType !== LoginType.EMAIL) {
        return new NextResponse(
          JSON.stringify({
            message: "소셜 로그인은 해당 소셜 홈페이지에서 비밀번호를 변경해주세요.",
          }),
          { status: 403 }
        );
      }

      const isVerifyPassword = await verifyPassword(
        currentPassword,
        user?.password || ""
      );

      if (!isVerifyPassword) {
        return new NextResponse(
          JSON.stringify({ message: "기존 비밀번호가 일치하지 않아요." }),
          { status: 401 }
        );
      }

      const hashedPassword = await getHasdPassword(password);

      const result = await User.updateOne(
        { _id: new mongoose.Types.ObjectId(myUid) },
        { $set: { password: hashedPassword } }
      );

      if (!result.acknowledged || result.modifiedCount === 0) {
        return new NextResponse(
          JSON.stringify({
            message: "비밀번호 변경에 실패했어요.\n잠시 후 다시 시도해주세요.",
          }),
          { status: 500 }
        );
      }
    }

    await deleteEmailVerifyCode(email, isFindPw);

    return new NextResponse(
      JSON.stringify({ message: "비밀번호가 변경되었어요." }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        message: "비밀번호 변경에 실패하였습니다\n잠시 후 다시 시도해주세요.",
      }),
      { status: 500 }
    );
  }
}
