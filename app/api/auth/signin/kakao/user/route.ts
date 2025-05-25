import getKakaoAuthAccessToken from "@/domains/auth/signin/api/getKaKakaoAuthAccessToken";
import getKaKaoAuthInfo from "@/domains/auth/signin/api/getKakaoAuthInfo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  if (!code) {
    return NextResponse.json(
      { message: "유저 코드가 없어요." },
      { status: 422 }
    );
  }

  let kakaoAccessToken;

  try {
    const response = await getKakaoAuthAccessToken(code);
    kakaoAccessToken = response.data.access_token;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "토큰을 가져오지못했어요." },
      { status: 401 }
    );
  }

  try {
    const response = await getKaKaoAuthInfo(kakaoAccessToken);
    const kakaoUserData = response.data;
    return NextResponse.json(
      {
        message: "유저정보를 성공적으로 가져욌어요.",
        user: { ...kakaoUserData }
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
