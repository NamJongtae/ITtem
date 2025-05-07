import { deleteEmailVerifyCode, getVerifiedEmail } from "@/lib/api/redis";
import { getHasdPassword } from "@/lib/api/auth";
import dbConnect from "@/lib/db/db";
import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { IronSessionType } from "@/types/api-types";
import { createAndSaveToken, sessionOptions } from "@/lib/server";
import User from "@/lib/db/models/User";
import { LoginType } from "@/types/auth-types";
import mongoose from "mongoose";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { email, password, nickname, profileImgData, introduce } =
      await req.json();

    try {
      const isVerifyedEmail = await getVerifiedEmail(email);
      if (!isVerifyedEmail) {
        return NextResponse.json(
          { message: "인증되지 않은 이메일이에요." },
          { status: 401 }
        );
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "인증되지 않은 이메일이에요." },
        { status: 401 }
      );
    }

    const hashedPassword = await getHasdPassword(password);

    await dbConnect();

    const userData = {
      loginType: LoginType.EMAIL,
      email: email.toLowerCase(),
      password: hashedPassword,
      nickname,
      profileImg: profileImgData.url,
      profileImgFilename: profileImgData.name,
      introduce
    };

    const newUser = new User(userData);

    await newUser.save();

    const session = await getIronSession<IronSessionType>(
      await cookies(),
      sessionOptions
    );

    await createAndSaveToken({
      user: {
        uid: newUser._id
      },
      session
    });

    await deleteEmailVerifyCode(email);

    return NextResponse.json(
      {
        message: "회원가입에 성공했어요.",
        user: {
          uid: newUser._id,
          email,
          nickname,
          profileImg: profileImgData.url
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
      {
        message: "회원가입에 실패했어요.\n잠시 후 다시 시도해주세요."
      },
      { status: 500 }
    );
  }
}
