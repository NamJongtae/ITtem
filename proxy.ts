import { NextRequest, NextResponse } from "next/server";
import {
  checkWithoutAuthPathname,
  withoutAuth
} from "./shared/common/utils/withoutAuth";
import { IronSession, getIronSession } from "iron-session";
import { SESSION_OPTIONS } from "./domains/auth/shared/common/constants/constansts";
import {
  checkWithAuthPathname,
  withAuth
} from "./shared/common/utils/withAuth";

export async function proxy(req: NextRequest, res: NextResponse) {
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
