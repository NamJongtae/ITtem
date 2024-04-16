import { NextRequest, NextResponse } from "next/server";

export const checkWithAuthPathname = (pathname: string) => {
  return (
    pathname.startsWith("/chat") ||
    pathname.includes("/product/manage") ||
    pathname.includes("/product/upload")
  );
};

// 로그인 상태일 때만 접근 가능
// 로그아웃 상태 시 리다이렉트
export const withAuth = (req: NextRequest) => {
  const url = req.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  return NextResponse.redirect(url);
};
