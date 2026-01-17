import Session from "@/domains/auth/shared/common/models/Sessions";
import User from "@/domains/auth/shared/common/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { message: "유저 이메일이 없어요." },
      {
        status: 422
      }
    );
  }

  const dbUserData = await User.findOne({ email });

  if (!dbUserData) {
    return NextResponse.json(
      { message: "존재하지 않는 유저입니다." },
      { status: 404 }
    );
  }

  const deleteResult = await Session.deleteMany({ uid: dbUserData._id });

  if (deleteResult.deletedCount === 0) {
    return NextResponse.json(
      { message: "삭제할 세션이 존재하지 않습니다." },
      { status: 404 }
    );
  }

  const response = NextResponse.json(
    { message: "세션 ID 삭제 성공" },
    {
      status: 200
    }
  );
  response.cookies.delete("sessionId");
  return response;
}
