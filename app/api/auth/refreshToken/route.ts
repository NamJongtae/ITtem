import {
  ACCESS_TOKEN_EXP,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "@/constants/constant";
import { getToken, saveToken } from "@/lib/api/redis";
import { sessionOptions } from "@/lib/server";
import { generateToken, verifyToken } from "@/lib/token";
import { IronSessionType } from "@/types/apiTypes";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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
      REFRESH_TOKEN_KEY as string
    );

    const redisRefreshToken = await getToken(
      decodeRefreshToken?.data?.user.uid || "",
      "refreshToken"
    );

    if (
      !redisRefreshToken ||
      redisRefreshToken !== refreshToken ||
      !decodeRefreshToken?.isValid
    ) {
      session.destroy();

      const response = NextResponse.json(
        { message: "세션이 만료됬어요." },
        { status: 401 }
      );

      return response;
    }

    const newAccessToken = await generateToken({
      payload: {
        user: decodeRefreshToken.data?.user,
        exp: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXP,
      },
      secret: ACCESS_TOKEN_KEY,
    });

    await saveToken({
      uid: decodeRefreshToken.data?.user.uid || "",
      token: newAccessToken,
      type: "accessToken",
      exp: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXP,
    });

    session.accessToken = newAccessToken;
    await session.save();

    const response = NextResponse.json(
      {
        message: "토큰이 발급 됬어요.",
        accessToken: newAccessToken,
      },
      { status: 200 }
    );
    return response;
  } catch (error) {
    console.log(error);
    const response = NextResponse.json(
      {
        message: "토큰 발급에 실패 했어요.",
      },
      { status: 500 }
    );
    return response;
  }
}
