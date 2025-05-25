import getTokenFromRedis from "@/domains/auth/shared/common/api/getTokenFromRedis";
import deleteTokenFromRedis from "@/domains/auth/shared/common/api/deleteTokenFromRedis";
import dbConnect from "@/shared/common/utils/db/db";
import User from "@/domains/auth/shared/common/models/User";
import { SESSION_OPTIONS } from "@/domains/auth/shared/common/constants/constansts";
import { IronSessionType } from "@/domains/auth/shared/common/types/authTypes";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  const { uid } = await req.json();

  try {
    const session = await getIronSession<IronSessionType>(
      await cookies(),
      SESSION_OPTIONS
    );
    const refreshToken = session.refreshToken;

    await dbConnect();

    const redisRefreshToken = await getTokenFromRedis(
      uid as string,
      "refreshToken"
    );

    if (redisRefreshToken && redisRefreshToken !== refreshToken) {
      const response = NextResponse.json(
        { message: "유효하지 않은 요청입니다." },
        { status: 403 }
      );

      return response;
    }

    // redis 토큰 삭제
    await deleteTokenFromRedis(uid || "", "accessToken");
    await deleteTokenFromRedis(uid || "", "refreshToken");

    // 세션 쿠키 삭제
    session.destroy();

    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId((uid as string) || "")
    });

    if (user?.loginType === "KAKAO") {
      return NextResponse.json(
        { message: "카카오 계정은 별도의 로그아웃이 필요해요." },
        { status: 202 }
      );
    }

    return NextResponse.json(
      { message: "로그아웃에 성공했어요." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "로그아웃에 실패했어요.\n 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
