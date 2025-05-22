"use client";

import Loading from "@/components/loading";
import useKakaoSigninMutate from '@/domains/auth/hooks/signin/mutations/useKakaoSigninMutate';
import useKakaoUserInfoMutate from '@/domains/auth/hooks/signin/mutations/useKakaoUserInfoMutate';
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
