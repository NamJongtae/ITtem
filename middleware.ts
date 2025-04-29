import { NextRequest, NextResponse } from "next/server";
import { checkWithOutAuthPathname, withoutAuth } from "./lib/withoutAuth";
import { IronSession, getIronSession } from "iron-session";
import { sessionOptions } from "./lib/server";
import { checkWithAuthPathname, withAuth } from "./lib/withAuth";

export async function middleware(req: NextRequest, res: NextResponse) {
  const { pathname } = req.nextUrl;

  const response = NextResponse.next();
  response.cookies.set("X-Requested-URL", pathname, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    path: "/"
  });

  const isWithOutAuth = checkWithOutAuthPathname(pathname);

  const isWithAuth = checkWithAuthPathname(pathname);

  const session = await getIronSession<
    IronSession<{ accessToken: string; refreshToken: string; exp: number }>
  >(req, res, sessionOptions);

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
    "/findpassword",
    "/chat/:path*",
    "/profile/:path*",
    "/product/:path*",
  ]
};
