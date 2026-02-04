import { BASE_URL } from "@/shared/common/constants/constant";
import { Metadata } from "next";

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

export const SESSION_TTL = 60 * 60 * 24 * 7 * 1000;

export const BASE_METADATA: Metadata = {
  title: "ITtem",
  metadataBase: new URL(BASE_URL),
  description:
    "중고거래 플랫폼, 잇템. 안전하고 쉬운 중고거래, 다양한 상품과 빠른 거래를 경험하세요.",
  verification: {
    google: "c6hLQ83ILZIlJb0fwdyrw71DGHnTFaI7hmmORy7fpk0",
    other: {
      "naver-site-verification": "8a189164663805b9eeea137c43336f57fa7bdcf2"
    }
  },
  icons: {
    icon: "/icons/logo.svg"
  },
  openGraph: {
    url: BASE_URL,
    title: "ITtem",
    description:
      "중고거래 플랫폼, 잇템. 안전하고 쉬운 중고거래, 다양한 상품과 빠른 거래를 경험하세요.",
      images: {
        url:"/images/opengraph-image.png"
      }
  }
};
