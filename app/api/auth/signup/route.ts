import deleteEmailVerificationCode from "@/domains/auth/shared/email-verification/api/deleteEmailVerificationCode";
import getVerifiedEmail from "@/domains/auth/shared/email-verification/api/getVerifiedEmail";
import hashPassword from "@/domains/auth/shared/common/utils/hashPassoword";
import dbConnect from "@/shared/common/utils/db/db";
import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { IronSessionType } from "@/domains/auth/shared/common/types/authTypes";
import { LoginType } from "@/domains/auth/signin/types/signinTypes";
import { SESSION_OPTIONS } from "@/domains/auth/shared/common/constants/constansts";
import User from "@/domains/auth/shared/common/models/User";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import createAndSaveToken from "@/domains/auth/shared/common/utils/createAndSaveToken";

export async function POST(req: NextRequest) {
  try {
    const { email, password, nickname, profileImgData, introduce } =
      await req.json();

    try {
      const isEmailVerified = await getVerifiedEmail(email, "signup");
      if (!isEmailVerified) {
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

    const hashedPassword = await hashPassword(password);

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
      SESSION_OPTIONS
    );

    await createAndSaveToken({
      user: {
        uid: newUser._id
      },
      session
    });

    await deleteEmailVerificationCode(email, "signup");

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
