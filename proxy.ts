import { NextRequest, NextResponse } from "next/server";
import {
  checkWithoutAuthPathname,
  withoutAuth
} from "./shared/common/utils/withoutAuth";
import {
  checkWithAuthPathname,
  withAuth
} from "./shared/common/utils/withAuth";

export async function proxy(req: NextRequest) {
  const { pathname, href } = req.nextUrl;

  const response = NextResponse.next();

  response.cookies.set(
    "X-Requested-URL",
    encodeURIComponent(href.replace(req.nextUrl.origin, "")),
    {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
      path: "/"
    }
  );

  const isWithOutAuth = checkWithoutAuthPathname(pathname);
  const isWithAuth = checkWithAuthPathname(pathname);

  const sessionId = req.cookies.get("sessionId")?.value;

  // 로그인 상태인데 비로그인 전용 페이지 접근
  if (isWithOutAuth && sessionId) {
    return withoutAuth(req);
  }

  // 로그인 필요 페이지인데 세션 없음
  if (isWithAuth && !sessionId) {
    return withAuth(req);
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/signin",
    "/signup",
    "/find-password",
    "/chat/:path*",
    "/profile/:path*",
    "/product/:path*"
  ]
};
