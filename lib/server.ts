import { IronSessionType } from "@/types/apiTypes";
import { SessionOptions, getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "./token";
import { getToken } from "./api/redis";

export const sessionOptions: SessionOptions = {
  password: process.env.NEXT_SECRET_IRON_SESSION_KEY as string,
  cookieName: "session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  },
};

export async function checkAuthorization(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getIronSession<IronSessionType>(
    req,
    res,
    sessionOptions
  );

  const accessToken = session.accessToken;

  const decodeAccessToken = verifyToken(
    accessToken as string,
    process.env.NEXT_SECRET_ACCESS_TOKEN_KEY as string
  );

  if (!decodeAccessToken?.isVaild) {
    return { isValid: false, message: "만료된 토큰이에요." };
  }

  const redisAccessToken = await getToken(
    decodeAccessToken?.data?.user.uid as string,
    "accessToken"
  );

  if (accessToken && accessToken !== redisAccessToken) {
    return { isValid: false, message: "만료된 토큰이에요." };
  } else {
    return {
      isValid: true,
      auth: decodeAccessToken.data?.user,
      message: "유효한 토큰이에요.",
    };
  }
}
