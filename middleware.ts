import { NextRequest, NextResponse } from "next/server";
import { checkWithOutAuthPathname, withoutAuth } from "./utils/withoutAuth";
import { IronSession, getIronSession } from "iron-session";
import { SESSION_OPTIONS } from "./domains/auth/constants/constansts";
import { checkWithAuthPathname, withAuth } from "./utils/withAuth";

export async function middleware(req: NextRequest, res: NextResponse) {
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

  const isWithOutAuth = checkWithOutAuthPathname(pathname);

  const isWithAuth = checkWithAuthPathname(pathname);

  const session = await getIronSession<
    IronSession<{ accessToken: string; refreshToken: string; exp: number }>
  >(req, res, SESSION_OPTIONS);

  const refreshToken = session.refreshToken;

  if (isWithOutAuth && refreshToken) {
    return withoutAuth(req);
  }

  if (isWithAuth && !refreshToken) {
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
