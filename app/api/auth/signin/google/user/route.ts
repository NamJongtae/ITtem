import getGoogleAuthAccessToken from "@/domains/auth/signin/api/getGoogleAuthAccessToken";
import getGoogleAuthInfo from "@/domains/auth/signin/api/getGoogleAuthInfo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  if (!code) {
    return NextResponse.json(
      { message: "유저 코드가 없어요." },
      { status: 422 }
    );
  }

  let googleAccessToken;

  try {
    const response = await getGoogleAuthAccessToken(code);
    googleAccessToken = response.data.access_token;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "토큰을 가져오지못했어요." },
      { status: 401 }
    );
  }

  try {
    const response = await getGoogleAuthInfo(googleAccessToken);
    const googleUserData = response.data;
    return NextResponse.json(
      {
        message: "유저정보를 성공적으로 가져욌어요.",
        user: { ...googleUserData }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "유저정보를 가져오지못했어요." },
      { status: 500 }
    );
  }
}
