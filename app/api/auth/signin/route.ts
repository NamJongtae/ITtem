import comparePassword from "@/domains/auth/shared/common/utils/comparePassword";
import dbConnect from "@/shared/common/utils/db/db";
import User from "@/domains/auth/shared/common/models/User";
import Session from "@/domains/auth/shared/common/models/Sessions";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";
import * as Sentry from "@sentry/nextjs";
import { SESSION_TTL } from "@/domains/auth/shared/common/constants/constansts";

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

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || user.loginType !== "EMAIL") {
      return NextResponse.json(
        { message: "이메일 혹은 비밀번호가 일치하지 않아요." },
        { status: 401 }
      );
    }

    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "이메일 혹은 비밀번호가 일치하지 않아요." },
        { status: 401 }
      );
    }

    // 🔑 활성 세션 확인
    const activeSession = await Session.findOne({
      uid: user._id,
      expiresAt: { $gt: new Date() }
    });

    // ❌ 중복 로그인 차단
    if (activeSession && !isDuplicateLogin) {
      return NextResponse.json(
        {
          message: "제대로 로그아웃 하지 않았거나\n이미 로그인 중인 ID 입니다."
        },
        { status: 409 }
      );
    }

    // ✅ 중복 로그인 허용 → 기존 세션 제거
    if (activeSession && isDuplicateLogin) {
      await Session.deleteMany({ uid: user._id });
    }

    // 새 세션 생성
    const sessionId = uuid();
    const expiresAt = new Date(Date.now() + SESSION_TTL);

    await Session.create({
      sessionId,
      uid: user._id,
      expiresAt
    });

    // 쿠키 설정
    const cookieStore = await cookies();
    cookieStore.set("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/"
    });

    return NextResponse.json(
      {
        message: "로그인에 성공했습니다.",
        user: {
          uid: user._id,
          email: user.email,
          nickname: user.nickname,
          profileImg: user.profileImg
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);

    return NextResponse.json(
      { message: "로그인에 실패했어요.\n잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
