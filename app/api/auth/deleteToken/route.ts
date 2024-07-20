import { deleteToken } from "@/lib/api/redis";
import dbConnect from "@/lib/db";
import User from "@/lib/db/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { email } = await req.json();

    await dbConnect();

    const dbUserData = await User.findOne({
      email,
    });

    await deleteToken(dbUserData?._id || "", "accessToken");
    await deleteToken(dbUserData?._id || "", "refreshToken");
    return NextResponse.json(
      { message: "성공적으로 토큰이 삭제됬어요." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "토큰 삭제에 실패했어요." },
      { status: 500 }
    );
  }
}
