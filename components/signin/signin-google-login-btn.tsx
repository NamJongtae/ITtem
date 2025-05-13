import useGoogleLogin from "@/hooks/signin/useGoogleLogin";
import Image from "next/image";
import React, { forwardRef } from "react";

const SigninGoogleLoginBtn = forwardRef<HTMLButtonElement | null>((_, ref) => {
  const { googleLogin } = useGoogleLogin();

  return (
    <button
      type="button"
      onClick={googleLogin}
      className="relative mb-5 text-sm bg-white shadow-[0px_0px_2px_rgba(0,0,0,0.2)] py-3 rounded-md"
      ref={ref}
    >
      <Image
        className="absolute left-5 top-1/2 -translate-y-1/2"
        src="/icons/google-icon.svg"
        alt=""
        width={20}
        height={20}
      />
      구글로 시작하기
    </button>
  );
});

SigninGoogleLoginBtn.displayName = "SigninGoogleLoginBtn";
export default SigninGoogleLoginBtn;
