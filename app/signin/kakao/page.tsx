"use client";

import Loading from "@/app/loading";
import useKakaoSigninMutate from "@/hooks/reactQuery/mutations/auth/useKakaoSigninMutate";
import useKakaoUserInfoMutate from "@/hooks/reactQuery/mutations/auth/useKakaoUserInfoMutate";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function KakaoAuth() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code")?.toString();
  const { kakaoSigninMutate } = useKakaoSigninMutate();
  const { kakaoUserInfoMutate, user } = useKakaoUserInfoMutate();

  useEffect(() => {
    if (code) {
      kakaoUserInfoMutate(code);
    }
  }, [code, kakaoUserInfoMutate]);

  useEffect(() => {
    if (user) {
      kakaoSigninMutate(user);
    }
  }, [user, kakaoSigninMutate]);

  return <Loading />;
}
