import useKakaoLogin from "@/hooks/signin/useKakaoLogin";
import Image from "next/image";
import React from "react";

export default function SigninKakaoLoginBtn() {
  const { kakaoLogin } = useKakaoLogin();
  return (
    <button
      onClick={kakaoLogin}
      type="button"
      className="relative mt-5 text-sm bg-[#FEE500] py-3 rounded-md"
    >
      <Image
        className="absolute left-5 top-1/2 -translate-y-1/2"
        src="/icons/kakao-icon.svg"
        alt=""
        width={20}
        height={20}
      />
      카카오로 시작하기
    </button>
  );
}
