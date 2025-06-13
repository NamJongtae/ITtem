import deleteTokenFromRedis from "@/domains/auth/shared/common/utils/deleteTokenFromRedis";
import dbConnect from "@/shared/common/utils/db/db";
import User from "@/domains/auth/shared/common/models/User";
import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function DELETE(req: NextRequest) {
  try {
    const { email } = await req.json();

    await dbConnect();

    const dbUserData = await User.findOne({
      email
    });

    await deleteTokenFromRedis(dbUserData?._id || "", "accessToken");
    await deleteTokenFromRedis(dbUserData?._id || "", "refreshToken");
    return NextResponse.json(
      { message: "성공적으로 토큰이 삭제됬어요." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json(
      { message: "토큰 삭제에 실패했어요." },
      { status: 500 }
    );
  }
}
