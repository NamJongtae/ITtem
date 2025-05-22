import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db/db";
import User from "@/domains/auth/models/User";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    await dbConnect();

    const isDuplication = await User.findOne({
      email: { $regex: new RegExp(email, "i") }
    });

    if (isDuplication) {
      return NextResponse.json(
        { message: "이미 사용중인 이메일입니다.", ok: false },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "사용 가능한 이메일입니다.", ok: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "이메일 확인에 실패하였습니다.", ok: false },
      { status: 500 }
    );
  }
}
