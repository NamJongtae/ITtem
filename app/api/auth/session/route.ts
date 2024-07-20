import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = cookies().get("session");
  if (session) {
    return NextResponse.json(
      { message: "세션 쿠기가 존재해요.", ok: true },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: "세션 쿠기가 존재하지 않아요.", ok: false },
      { status: 200 }
    );
  }
}
