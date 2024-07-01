import { NextRequest, NextResponse } from "next/server";
import { checkWithOutAuthPathname, withoutAuth } from "./lib/withoutAuth";
import { IronSession, getIronSession } from "iron-session";
import { sessionOptions } from "./lib/server";
import { checkWithAuthPathname, withAuth } from "./lib/withAuth";

export async function middleware(req: NextRequest, res: NextResponse) {
  const { pathname } = req.nextUrl;

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

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/signin",
    "/signup",
    "/findpassword",
    "/chat:path*",
    "/profile:path*",
    "/product/upload/:path*",
    "/product/manage/:path*",
  ],
};
