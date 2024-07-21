import useSocialLoginBtns from "@/hooks/signin/useSocialLoginBtns";
import Image from "next/image";
import { MutableRefObject } from "react";

interface IProps {
  isModal?: boolean;
  googleLoginBtnRef: MutableRefObject<HTMLButtonElement | null>;
}

export default function SigninSocialLoginBtns({ isModal, googleLoginBtnRef }: IProps) {
  const { handleClickGoogleLogin, handleClickKaKaoLogin } =
    useSocialLoginBtns();

  return (
    <div className="relative flex flex-col gap-3">
      <button
        onClick={handleClickKaKaoLogin}
        type="button"
        className="relative mt-5 text-sm bg-[#FEE500] py-3 rounded-md"
      >
        <Image
          className="absolute left-5 top-1/2 -translate-y-1/2"
          src="/icons/kakao_icon.svg"
          alt=""
          width={20}
          height={20}
        />
        카카오로 시작하기
      </button>
      <div
        className={`absolute w-full h-[1px] bg-gray-600 before:absolute before:h-5 before:-top-[9px] before:left-1/2 before:-translate-x-1/2 before:text-xs before:text-gray-700 before:px-2 ${
          isModal ? "before:bg-white" : "before:bg-gray-100"
        } before:content-[attr(data-before)]`}
        role="line"
        data-before="3초만에 시작하기"
      />
      <button
        type="button"
        onClick={() => handleClickGoogleLogin()}
        className="relative mb-5 text-sm  shadow-[0px_0px_2px_rgba(0,0,0,0.2)] py-3 rounded-md"
        ref={googleLoginBtnRef}
      >
        <Image
          className="absolute left-5 top-1/2 -translate-y-1/2"
          src="/icons/google_icon.svg"
          alt=""
          width={20}
          height={20}
        />
        구글로 시작하기
      </button>
    </div>
  );
}
