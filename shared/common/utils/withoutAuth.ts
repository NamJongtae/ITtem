import { NextRequest, NextResponse } from "next/server";

export const checkWithoutAuthPathname = (pathname: string) => {
  return (
    pathname.startsWith("/signup") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/find-password")
  );
};

// 로그아웃 상태일 때만 접근 가능
// 로그인 시 리다이렉트
export const withoutAuth = (req: NextRequest) => {
  const url = req.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  return NextResponse.redirect(url);
};
