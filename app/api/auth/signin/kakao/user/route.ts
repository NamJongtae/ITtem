import getKakaoAuthAccessToken from "@/domains/auth/signin/api/getKaKakaoAuthAccessToken";
import getKaKaoAuthInfo from "@/domains/auth/signin/api/getKakaoAuthInfo";
import { isAxiosError } from "axios";
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
    if (isAxiosError(error) && error.response?.status === 429) {
      return NextResponse.json(
        {
          message:
            "너무 잦은 로그인 시도로 카카오 로그인이 일시적으로 제한되었습니다. 잠시 후 다시 시도해주세요."
        },
        { status: 429 }
      );
    }
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
        message: "유저정보를 성공적으로 가져왔어요.",
        user: { ...kakaoUserData }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "유저정보를 가져오지 못했어요.\n잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
