import { REFRESH_TOKEN_KEY } from "@/constants/constant";
import { deleteToken } from "@/lib/api/redis";
import dbConnect from "@/lib/db";
import User from "@/lib/db/models/User";
import { sessionOptions } from "@/lib/server";
import { verifyToken } from "@/lib/token";
import { IronSessionType } from "@/types/apiTypes";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getIronSession<IronSessionType>(
      cookies(),
      sessionOptions
    );
    const refreshToken = session.refreshToken;
    const decodeRefreshToken = await verifyToken(
      refreshToken,
      REFRESH_TOKEN_KEY
    );
    await deleteToken(decodeRefreshToken?.data?.user.uid || "", "accessToken");
    await deleteToken(decodeRefreshToken?.data?.user.uid || "", "refreshToken");

    session.destroy();

    await dbConnect();

    if (!decodeRefreshToken?.data?.user.uid) {
      return NextResponse.json(
        { message: "유효하지 않은 토큰입니다." },
        { status: 403 }
      );
    }

    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(
        decodeRefreshToken?.data?.user.uid || ""
      ),
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
