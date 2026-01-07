import dbConnect from "@/shared/common/utils/db/db";
import User from "@/domains/auth/shared/common/models/User";
import { LoginType } from "@/domains/auth/signin/types/signinTypes";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import createUniqueNickname from "@/domains/auth/signup/utils/createUniqueNickname";
import * as Sentry from "@sentry/nextjs";
import { v4 as uuid } from "uuid";
import Session from "@/domains/auth/shared/common/models/Sessions";
import { SESSION_TTL } from "@/domains/auth/shared/common/constants/constansts";

export async function POST(req: NextRequest) {
  const { user } = await req.json();

  if (!user) {
    return NextResponse.json(
      { message: "유저정보가 없어요." },
      { status: 422 }
    );
  }

  try {
    const kakaoUserData = user;

    await dbConnect();

    const dbUserData = await User.findOne({
      email: kakaoUserData.id.toString()
    });

    if (!dbUserData) {
      // 회원가입 로직
      try {
        const userNickname = await createUniqueNickname(User);

        const email = kakaoUserData.id.toString();
        const profileImg = kakaoUserData.properties.profile_image;

        const newUser = await User.create({
          email,
          nickname: userNickname,
          profileImg,
          loginType: LoginType.KAKAO,
          profileImgFilename: ""
        });

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

        console.log(newUser._id, userNickname);

        return NextResponse.json(
          {
            message: "회원가입에 성공했어요.",
            user: {
              uid: newUser._id,
              email: newUser.email,
              nickname: newUser.nickname,
              profileImg: newUser.profileImg || "/icons/user_icon.svg"
            }
          },
          { status: 201 }
        );
      } catch (error) {
        console.log(error);
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
          {
            message: "회원가입에 실패했어요."
          },
          { status: 500 }
        );
      }
    }

    if (dbUserData.loginType !== "KAKAO") {
      return NextResponse.json(
        {
          message: "이미 가입된 이메일입니다."
        },
        { status: 401 }
      );
    }

    // 로그인 로직
    const { _id: uid, email, nickname, profileImg } = dbUserData;

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
          uid,
          email,
          nickname,
          profileImg
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
    return NextResponse.json(
      {
        message: "로그인에 실패했어요.\n잠시 후 다시 시도해주세요."
      },
      { status: 500 }
    );
  }
}
