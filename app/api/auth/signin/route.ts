import { verificationPassword } from "@/lib/api/auth";
import { getToken } from "@/lib/api/redis";
import dbConnect from "@/lib/db/db";
import User from "@/lib/db/models/User";
import { createAndSaveToken, sessionOptions } from "@/lib/server";
import { IronSessionType } from "@/types/api-types";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password, isDuplicateLogin } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "유효하지 않은 값이 있어요." },
        { status: 422 }
      );
    }

    await dbConnect();

    const userData = await User.findOne({ email: email.toLowerCase() });

    // 소셜 로그인으로 가입한 경우
    if (userData?.loginType !== "EMAIL") {
      return NextResponse.json(
        { message: "이메일 혹은 비밀번호가 일치하지 않아요." },
        { status: 401 }
      );
    }

    if (!userData) {
      return NextResponse.json(
        { message: "이메일 혹은 비밀번호가 일치하지 않아요." },
        { status: 401 }
      );
    }

    const isPasswordVerification = await verificationPassword(password, userData.password);

    if (!isPasswordVerification) {
      return NextResponse.json(
        { message: "이메일 혹은 비밀번호가 일치하지 않아요." },
        { status: 401 }
      );
    }

    const refreshTokenData = await getToken(userData._id, "refreshToken");

    if (refreshTokenData && !isDuplicateLogin) {
      return NextResponse.json(
        {
          message: "제대로 로그아웃 하지 않았거나\n이미 로그인 중인 ID 입니다.",
        },
        { status: 409 }
      );
    }

    const session = await getIronSession<IronSessionType>(
      await cookies(),
      sessionOptions
    );

    await createAndSaveToken({
      user: {
        uid: userData._id,
      },
      session,
    });

    return NextResponse.json(
      {
        message: "로그인에 성공했습니다.",
        user: {
          uid: userData._id,
          email: userData.email,
          nickname: userData.nickname,
          profileImg: userData.profileImg,
        },
        session,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "로그인에 실패했어요.\n잠시 후 다시 시도해주세요.",
      },
      { status: 500 }
    );
  }
}
