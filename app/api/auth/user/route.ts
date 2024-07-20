import dbConnect from "@/lib/db";
import User from "@/lib/db/models/User";
import { checkAuthorization } from "@/lib/server";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const isValidAuth = await checkAuthorization();

    if (!isValidAuth.isValid) {
      const response = NextResponse.json(
        { message: isValidAuth.message },
        {
          status: 401,
        }
      );
      return response;
    }

    const myUid = isValidAuth?.auth?.uid;

    await dbConnect();

    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(myUid),
    });

    const response = NextResponse.json(
      {
        message: "유저정보를 성공적으로 불러왔어요.",
        user: {
          uid: user._id,
          nickname: user.nickname,
          profileImg: user.profileImg,
          email: user.email,
        },
      },
      {
        status: 200,
      }
    );

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "유저 인증에 실패했어요.\n잠시 후 다시 시도해주세요.",
      },
      { status: 500 }
    );
  }
}
