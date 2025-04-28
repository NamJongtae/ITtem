"use client";


import Loading from '@/components/commons/loading';
import useKakaoSigninMutate from "@/hooks/react-query/mutations/auth/useKakaoSigninMutate";
import useKakaoUserInfoMutate from "@/hooks/react-query/mutations/auth/useKakaoUserInfoMutate";
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
