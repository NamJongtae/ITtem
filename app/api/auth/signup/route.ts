import hashPassword from "@/domains/auth/shared/common/utils/hashPassoword";
import dbConnect from "@/shared/common/utils/db/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/domains/auth/shared/common/models/User";
import Session from "@/domains/auth/shared/common/models/Sessions";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { LoginType } from "@/domains/auth/signin/types/signinTypes";
import { v4 as uuid } from "uuid";
import * as Sentry from "@sentry/nextjs";
import { SESSION_TTL } from "@/domains/auth/shared/common/constants/constansts";
import EmailVerification from "@/domains/auth/signup/models/EmailVerification";

export async function POST(req: NextRequest) {
  try {
    const { email, password, nickname, profileImgData, introduce } =
      await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "유효하지 않은 값이 있어요." },
        { status: 422 }
      );
    }

    await dbConnect();

    // 1️⃣ 이메일 인증 확인
    const now = new Date();
    const verified = await EmailVerification.findOne({
      email,
      type: "signup",
      isVerified: true,
      expiresAt: { $gt: now }
    }).select({ _id: 1 });

    if (!verified) {
      return NextResponse.json(
        { message: "인증되지 않은 이메일이에요." },
        { status: 401 }
      );
    }

    const hashedPassword = await hashPassword(password);

    // 2️⃣ 유저 생성
    const newUser = await User.create({
      loginType: LoginType.EMAIL,
      email: email.toLowerCase(),
      password: hashedPassword,
      nickname,
      profileImg: profileImgData?.url,
      profileImgFilename: profileImgData?.name,
      introduce
    });

    // 3️⃣ 🔐 회원가입 즉시 세션 생성 (자동 로그인)
    const sessionId = uuid();
    const expiresAt = new Date(Date.now() + SESSION_TTL);

    await Session.create({
      sessionId,
      uid: newUser._id,
      expiresAt
    });

    // 4️⃣ 쿠키 설정
    const cookieStore = await cookies();
    cookieStore.set("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: expiresAt
    });

    await EmailVerification.deleteOne({ email, type: "signup" });

    return NextResponse.json(
      {
        message: "회원가입에 성공했어요.",
        user: {
          uid: newUser._id,
          email: newUser.email,
          nickname: newUser.nickname,
          profileImg: newUser.profileImg
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);

    if (error instanceof mongoose.Error.ValidationError) {
      const errorMessages = Object.values(error.errors).map(
        (err) => err.message
      );
      return NextResponse.json(
        { message: "유효하지 않은 값이 있어요.", error: errorMessages },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { message: "회원가입에 실패했어요.\n잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
