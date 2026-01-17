import dbConnect from "@/shared/common/utils/db/db";
import Session from "@/domains/auth/shared/common/models/Sessions";
import User from "@/domains/auth/shared/common/models/User";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sessionId")?.value;

    if (!sessionId) {
      return NextResponse.json(
        { message: "이미 로그아웃 상태입니다." },
        { status: 200 }
      );
    }

    await dbConnect();

    const session = await Session.findOne({ sessionId });

    if (session) {
      await Session.deleteOne({ sessionId });
    }

    cookieStore.set("sessionId", "", {
      path: "/",
      expires: new Date(0)
    });

    if (session?.uid) {
      const user = await User.findById(session.uid);
      if (user?.loginType === "KAKAO") {
        return NextResponse.json(
          { message: "카카오 계정은 별도의 로그아웃이 필요해요." },
          { status: 202 }
        );
      }
    }

    return NextResponse.json(
      { message: "로그아웃에 성공했어요." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);

    return NextResponse.json(
      { message: "로그아웃에 실패했어요.\n잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
