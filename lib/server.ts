import { IronSessionType } from "@/types/api-types";
import { SessionOptions } from "iron-session";
import { generateToken, verifyToken, verifyTokenByJose } from "./token";
import { getToken, saveToken } from "./api/redis";
import {
  ACCESS_TOKEN_EXP,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_EXP,
  REFRESH_TOKEN_KEY,
  VERIFICATION_EMAIL_BLOCK_EXP,
  VERIFICATION_EMAIL_EXP
} from "@/constants/constant";
import { v4 as uuid } from "uuid";
import { cookies } from "next/headers";
import { Model } from "mongoose";
import { UserDB } from "./db/models/User";
import { emailHTML } from "@/lib/emailHTML";
import {
  getEmailVerificationCode,
  saveEmailVerificationCode
} from "@/lib/api/redis";
import { VerificationEmailType } from '@/types/auth-types';

export const getSmtpTransport = async () => {
  const nodemailer = await import("nodemailer");
  return nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.NEXT_SECRET_SMTP_USER,
      pass: process.env.NEXT_SECRET_SMTP_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

export const sessionOptions: SessionOptions = {
  password: process.env.NEXT_SECRET_IRON_SESSION_KEY as string,
  cookieName: "session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    path: "/"
  }
};

export async function checkAuthorization() {
  const { getIronSession } = await import("iron-session");
  const session = await getIronSession<IronSessionType>(
    await cookies(),
    sessionOptions
  );

  const accessToken = session.accessToken;

  let decodeAccessToken;
  if (process.env.NEXT_RUNTIME === "edge") {
    decodeAccessToken = await verifyTokenByJose(
      accessToken as string,
      process.env.NEXT_SECRET_ACCESS_TOKEN_KEY as string
    );
  } else {
    decodeAccessToken = await verifyToken(
      accessToken as string,
      process.env.NEXT_SECRET_ACCESS_TOKEN_KEY as string
    );
  }

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
      message: "유효한 토큰이에요."
    };
  }
}

export async function createAndSaveToken({
  user,
  session
}: {
  user: { uid: string };
  session: IronSessionType;
}) {
  const accessToken = await generateToken({
    payload: { user, exp: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXP },
    secret: ACCESS_TOKEN_KEY
  });

  const refreshToken = await generateToken({
    payload: { user, exp: Math.floor(Date.now() / 1000) + REFRESH_TOKEN_EXP },
    secret: REFRESH_TOKEN_KEY as string
  });

  await saveToken({
    uid: user.uid,
    token: accessToken,
    type: "accessToken",
    exp: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXP
  });
  await saveToken({
    uid: user.uid,
    token: refreshToken,
    type: "refreshToken",
    exp: Math.floor(Date.now() / 1000) + REFRESH_TOKEN_EXP
  });

  session.accessToken = accessToken;
  session.refreshToken = refreshToken;

  await session.save();
}

export async function createUniqueNickname(User: Model<UserDB>) {
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

export async function sendVerificationCode(
  email: string,
  type: VerificationEmailType
) {
  const verifyCode = uuid().substring(0, 6).toUpperCase();

  const html = emailHTML(verifyCode, type);
  const mailOptions = {
    from: process.env.NEXT_SECRET_SMTP_USER,
    to: email,
    subject:
      type === "resetPw"
        ? "ITtem 비밀번호 찾기 인증 메일입니다."
        : "ITtem 회원가입 인증 메일입니다.",
    html
  };

  const data = await getEmailVerificationCode(email, type);
  if (data && parseInt(data.count) >= 10) {
    return {
      success: false,
      status: 403,
      message:
        "인증메일 전송, 인증 일일 시도 횟수를 초과하여\n24시간 동안 요청이 제한되요."
    };
  }

  await new Promise((resolve, reject) => {
    getSmtpTransport()
      .then((smtpTransport) => {
        smtpTransport.sendMail(mailOptions, (err, response) => {
          if (err) reject(err);
          else resolve(response);
        });
      })
      .catch((error) => reject(error));
  });

  if (data) {
    await saveEmailVerificationCode(
      email,
      verifyCode,
      type,
      parseInt(data.count) + 1,
      parseInt(data.count) >= 9
        ? VERIFICATION_EMAIL_BLOCK_EXP
        : VERIFICATION_EMAIL_EXP
    );
  } else {
    await saveEmailVerificationCode(email, verifyCode, type);
  }

  return {
    success: true,
    status: 200,
    message: "메일로 인증번호가 전송됐어요."
  };
}
