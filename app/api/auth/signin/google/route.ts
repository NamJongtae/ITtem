import dbConnect from "@/shared/common/utils/db/db";
import User from "@/domains/auth/shared/common/models/User";
import Session from "@/domains/auth/shared/common/models/Sessions";
import { LoginType } from "@/domains/auth/signin/types/signinTypes";
import createUniqueNickname from "@/domains/auth/signup/utils/createUniqueNickname";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import * as Sentry from "@sentry/nextjs";
import { SESSION_TTL } from "@/domains/auth/shared/common/constants/constansts";

export async function POST(req: NextRequest) {
  const { user, isDuplicateLogin } = await req.json();

  if (!user) {
    return NextResponse.json(
      { message: "유저정보가 없어요." },
      { status: 422 }
    );
  }

  try {
    const googleUserData = user;

    await dbConnect();

    const email = googleUserData.email.toLowerCase();
    const dbUserData = await User.findOne({ email });

    /**
     * 1️⃣ 회원가입
     */
    if (!dbUserData) {
      try {
        const userNickname = await createUniqueNickname(User);

        const newUser = await User.create({
          email,
          password: "",
          nickname: userNickname,
          profileImg: googleUserData.picture,
          loginType: LoginType.GOOGLE,
          profileImgFilename: ""
        });

        const existingSession = await Session.findOne({
          uid: dbUserData._id,
          expiresAt: { $gt: new Date() }
        });

        // ❌ 중복 로그인 차단
        if (existingSession && !isDuplicateLogin) {
          return NextResponse.json(
            {
              message:
                "제대로 로그아웃 하지 않았거나\n이미 로그인 중인 ID 입니다."
            },
            { status: 409 }
          );
        }

        // ✅ 중복 로그인 허용 → 기존 세션 제거
        if (existingSession && isDuplicateLogin) {
          await Session.deleteMany({ uid: dbUserData._id });
        }

        // 🔐 세션 생성 (회원가입 후 바로 로그인)
        const sessionId = uuid();
        const expiresAt = new Date(Date.now() + SESSION_TTL);

        await Session.create({
          sessionId,
          uid: newUser._id,
          expiresAt
        });

        const cookieStore = await cookies();
        cookieStore.set("sessionId", sessionId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          expires: expiresAt
        });

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
        if (error instanceof mongoose.Error.ValidationError) {
          const errorMessages = Object.values(error.errors).map(
            (err) => err.message
          );
          return NextResponse.json(
            {
              message: "유효하지 않은 값이 있어요.",
              error: errorMessages
            },
            { status: 422 }
          );
        }
        return NextResponse.json(
          { message: "회원가입에 실패했어요." },
          { status: 500 }
        );
      }
    }

    /**
     * 2️⃣ 로그인 타입 검증
     */
    if (dbUserData.loginType !== LoginType.GOOGLE) {
      return NextResponse.json(
        { message: "이미 가입된 이메일입니다." },
        { status: 401 }
      );
    }

    /**
     * 3️⃣ 중복 로그인 체크
     */
    const existingSession = await Session.findOne({
      uid: dbUserData._id,
      expiresAt: { $gt: new Date() }
    });

    if (existingSession) {
      return NextResponse.json(
        {
          message: "제대로 로그아웃 하지 않았거나\n이미 로그인 중인 ID 입니다."
        },
        { status: 409 }
      );
    }

    /**
     * 4️⃣ 로그인 → 세션 생성
     */
    const sessionId = uuid();
    const expiresAt = new Date(Date.now() + SESSION_TTL);

    await Session.create({
      sessionId,
      uid: dbUserData._id,
      expiresAt
    });

    const cookieStore = await cookies();
    cookieStore.set("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: expiresAt
    });

    return NextResponse.json(
      {
        message: "로그인에 성공했어요.",
        user: {
          uid: dbUserData._id,
          email: dbUserData.email,
          nickname: dbUserData.nickname,
          profileImg: dbUserData.profileImg
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
