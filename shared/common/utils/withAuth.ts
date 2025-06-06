import { NextRequest, NextResponse } from "next/server";

export const checkWithAuthPathname = (pathname: string) => {
  return (
    pathname === "/profile" ||
    pathname === "/profile/edit" ||
    pathname === "/profile/change-password" ||
    pathname.startsWith("/chat") ||
    pathname.startsWith("/product/manage") ||
    pathname.startsWith("/product/upload")
  );
};

// 로그인 상태일 때만 접근 가능
// 로그아웃 상태 시 리다이렉트
export const withAuth = (req: NextRequest) => {
  const url = req.nextUrl.clone();
  url.pathname = "/signin";
  url.search = "";
  return NextResponse.redirect(url);
};
