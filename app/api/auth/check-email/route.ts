import dbConnect from "@/shared/common/utils/db/db";
import User from "@/domains/auth/shared/common/models/User";
import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new NextResponse(JSON.stringify({ message: "이메일이 없어요." }), {
        status: 422
      });
    }

    await dbConnect();
    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "존재하지 않는 이메일이에요." }),
        { status: 401 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "존재하는 이메일이에요." }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    return new NextResponse(
      JSON.stringify({
        message: "이메일 확인에 실패했어요.\n잠시 후 다시 시도해주세요."
      }),
      { status: 500 }
    );
  }
}
