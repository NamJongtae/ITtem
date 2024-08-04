import { IronSessionType } from "@/types/api-types";
import { SessionOptions } from "iron-session";
import { generateToken, verifyToken } from "./token";
import { getToken, saveToken } from "./api/redis";
import {
  ACCESS_TOKEN_EXP,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_EXP,
  REFRESH_TOKEN_KEY,
} from "@/constants/constant";
import { v4 as uuid } from "uuid";
import { Model } from "mongoose";
import { cookies } from "next/headers";

export const getSmtpTransport = async () => {
  "use server";
  const nodemailer = await import("nodemailer");
  return nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.NEXT_SECRET_SMTP_USER,
      pass: process.env.NEXT_SECRET_SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};
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

export async function checkAuthorization() {
  const { getIronSession } = await import("iron-session");
  const session = await getIronSession<IronSessionType>(
    cookies(),
    sessionOptions
  );
  const accessToken = session.accessToken;

  const decodeAccessToken = await verifyToken(
    accessToken as string,
    process.env.NEXT_SECRET_ACCESS_TOKEN_KEY as string
  );

  if (!decodeAccessToken?.isValid) {
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

export async function createAndSaveToken({
  user,
  session,
}: {
  user: { uid: string };
  session: IronSessionType;
}) {
  const accessToken = await generateToken({
    payload: { user, exp: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXP },
    secret: ACCESS_TOKEN_KEY,
  });

  const refreshToken = await generateToken({
    payload: { user, exp: Math.floor(Date.now() / 1000) + REFRESH_TOKEN_EXP },
    secret: REFRESH_TOKEN_KEY as string,
  });

  await saveToken({
    uid: user.uid,
    token: accessToken,
    type: "accessToken",
    exp: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXP,
  });
  await saveToken({
    uid: user.uid,
    token: refreshToken,
    type: "refreshToken",
    exp: Math.floor(Date.now() / 1000) + REFRESH_TOKEN_EXP,
  });

  session.accessToken = accessToken;
  session.refreshToken = refreshToken;

  await session.save();
}

export async function createUniqueNickname(
  User: Model<any, {}, {}, {}, any, any>
) {
  const randomString = uuid().substring(0, 8);
  let userNickname = randomString;
  let isDuplicationNickname = true;
  while (isDuplicationNickname) {
    const nicknameCheckResult = await User.findOne({ nickname: userNickname });
    if (nicknameCheckResult) {
      // 닉네임이 중복될 경우, 랜덤 숫자를 추가하여 새로운 닉네임 생성
      userNickname = randomString;
    } else {
      // 닉네임이 중복되지 않으면 루프 종료
      isDuplicationNickname = false;
    }
  }
  return userNickname;
}
