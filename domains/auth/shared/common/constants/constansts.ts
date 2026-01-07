import { SessionOptions } from "iron-session";

export const EMAIL_REGEX = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
export const EMAIL_REGEX_ERRORMSG = "이메일 형식을 확인해주세요.";

export const PASSWORD_REGEX =
  /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
export const PASSWORD_REGEX_ERRORMSG =
  "8-16자 특수문자, 숫자, 영문을 포함해야해요.";

export const NICKNAME_REGEX = /^(?![0-9]+$)([a-zA-Z0-9가-힣]{4,8})$/;
export const NICKNAME_REGEX_ERRORMSG =
  "4-8자 닉네임(영문, 한글, 숫자조합)을 입력해주세요.";

export const VERIFICATION_CODE_REGEX = /^[A-Za-z0-9]{6}$/;
export const VERIFICATION_CODE_REGEX_ERRORMSG =
  "인증코드는 영문, 숫자, 영문+숫자 6자리이에요.";

export const VERIFICATION_EMAIL_BLOCK_EXP = 60 * 60 * 24;
export const VERIFICATION_EMAIL_EXP = 60 * 5;
export const VERIFIED_EMAIL_EXP = 60 * 30;

export const SESSION_TTL = 60 * 10 * 1000;

export const SESSION_OPTIONS: SessionOptions = {
  password: process.env.NEXT_SECRET_IRON_SESSION_KEY as string,
  cookieName: "session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    path: "/"
  }
};
