import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = (await cookies()).get("sessionId");
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

export async function DELETE() {
  const response = NextResponse.json(
    { message: "세션 쿠기 삭제 성공" },
    {
      status: 200
    }
  );
  response.cookies.delete("sessionId");
  return response;
}
