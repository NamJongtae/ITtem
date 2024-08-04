import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/db";
import User from "@/lib/db/models/User";

export async function POST(req: NextRequest) {
  try {
    const { nickname } = await req.json();

    await dbConnect();
    // 한글, 영문, 숫자, 혼합된 닉네임을 구분하여 처리
    let isDuplication;

    if (/^[a-zA-Z]+$/.test(nickname)) {
      // 영문으로만 구성된 닉네임인 경우
      isDuplication = await User.findOne({
        nickname: { $regex: new RegExp(nickname, "i") },
      });
    } else {
      // 한글로만 구성된 닉네임인 경우, 숫자 또는 한글, 영문, 숫자가 섞여있는 닉네임인 경우
      isDuplication = await User.findOne({
        nickname: { $regex: new RegExp(`^${nickname}$`, "i") },
      });
    }

    if (isDuplication) {
      return NextResponse.json(
        { message: "이미 사용중인 닉네임입니다.", ok: false },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "사용 가능한 닉네임입니다.", ok: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "닉네임 확인에 실패하였습니다.", ok: false },
      { status: 500 }
    );
  }
}
