export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const CATEGORY = [
  "전체",
  "의류",
  "가방/지갑",
  "신발",
  "시계",
  "스포츠",
  "악세사리",
  "악기/음반",
  "도서",
  "공구",
  "생활용품",
  "식품",
  "전자기기",
  "기타",
];

export const REVIEW_TAGS = [
  "상품 정보와 실제 상품이 동일해요.",
  "친절해요.",
  "배송이 빨라요.",
  "채팅 답변이 빨라요.",
  "제품이 깔끔해요.",
];

export const ERROR_MESSAGE =
  "알 수 없는 에러가 발생했어요.\n잠시 후 다시 시도해주세요.";

export const EMAIL_REGEX = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
export const EMAIL_REGEX_ERRORMSG = "이메일 형식을 확인해주세요.";

export const PASSWORD_REGEX =
  /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
export const PASSWORD_REGEX_ERRORMSG =
  "8-16자 특수문자, 숫자, 영문을 포함해야해요.";

export const NICKNAME_REGEX = /^(?![0-9]+$)([a-zA-Z0-9가-힣]{4,8})$/;
export const NICKNAME_REGEX_ERRORMSG =
  "4-8자 닉네임(영문, 한글, 숫자조합)을 입력해주세요.";

export const VERIFYCODE_REGEX = /^[A-Za-z0-9]{6}$/;
export const VERIFYCODE_REGEX_ERRORMSG =
  "인증코드는 영문, 숫자, 영문+숫자 6자리이에요.";

export const VERIFY_EMAIL_BLOCK_EXP = 60 * 60 * 24;
export const VERIFY_EMAIL_EXP = 60 * 5;
export const VERIFIED_EMAIL_EXP = 60 * 30;

export const ACCESS_TOKEN_KEY = process.env
  .NEXT_SECRET_ACCESS_TOKEN_KEY as string;
export const REFRESH_TOKEN_KEY = process.env
  .NEXT_SECRET_REFRESH_TOKEN_KEY as string;

export const ACCESS_TOKEN_EXP = 60 * 60; // 1h
export const REFRESH_TOKEN_EXP = 60 * 60 * 24 * 30; // 30d
