import dbConnect from "@/lib/db/db";
import User from "@/lib/db/models/User";
import {
  createAndSaveToken,
  createUniqueNickname,
  sessionOptions,
} from "@/lib/server";
import { IronSessionType } from "@/types/api-types";
import { LoginType } from "@/types/auth-types";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { getToken } from "@/lib/api/redis";

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
      email: kakaoUserData.id.toString(),
    });

    const session = await getIronSession<IronSessionType>(
      cookies(),
      sessionOptions
    );

    if (!dbUserData) {
      // 회원가입 로직
      try {
        const userNickname = await createUniqueNickname(User);

        const email = kakaoUserData.id.toString();
        const profileImg = kakaoUserData.properties.profile_image;

        const userData = {
          email,
          nickname: userNickname,
          profileImg,
          loginType: LoginType.KAKAO,
          profileImgFilename: "",
        };

        const newUser = new User(userData);

        await newUser.save();

        await createAndSaveToken({
          user: {
            uid: newUser._id,
          },
          session,
        });

        return NextResponse.json(
          {
            message: "회원가입에 성공했어요.",
            user: {
              uid: newUser._id,
              email: newUser.email,
              nickname: newUser.nickname,
              profileImg: newUser.profileImg || "/icons/user_icon.svg",
            },
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
              error: errorMessages,
            },
            { status: 422 }
          );
        }
        return NextResponse.json(
          {
            message: "회원가입에 실패했어요.",
          },
          { status: 500 }
        );
      }
    }

    if (dbUserData.loginType !== "KAKAO") {
      return NextResponse.json(
        {
          message: "이미 가입된 이메일입니다.",
        },
        { status: 401 }
      );
    }

    // 로그인 로직
    const { _id: uid, email, nickname, profileImg } = dbUserData;

    const refreshTokenData = await getToken(uid, "refreshToken");

    if (refreshTokenData) {
      return NextResponse.json(
        {
          message: "제대로 로그아웃 하지 않았거나\n이미 로그인 중인 ID 입니다.",
        },
        { status: 409 }
      );
    }

    await createAndSaveToken({
      user: { uid },
      session,
    });

    return NextResponse.json(
      {
        message: "로그인에 성공했어요.",
        user: {
          uid,
          email,
          nickname,
          profileImg,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "로그인에 실패했어요.\n잠시 후 다시 시도해주세요.",
      },
      { status: 500 }
    );
  }
}
