import { deleteToken, getToken } from "@/lib/api/redis";
import dbConnect from "@/lib/db/db";
import User from "@/lib/db/models/User";
import { sessionOptions } from "@/lib/server";
import { IronSessionType } from "@/types/api-types";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { uid } = await req.json();

  try {
    const session = await getIronSession<IronSessionType>(
      cookies(),
      sessionOptions
    );
    const refreshToken = session.refreshToken;

    await dbConnect();

    const redisRefreshToken = await getToken(uid as string, "refreshToken");

    if (redisRefreshToken && redisRefreshToken !== refreshToken) {
      const response = NextResponse.json(
        { message: "유효하지 않은 요청입니다." },
        { status: 403 }
      );

      return response;
    }

    // redis 토큰 삭제
    await deleteToken(uid || "", "accessToken");
    await deleteToken(uid || "", "refreshToken");

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
