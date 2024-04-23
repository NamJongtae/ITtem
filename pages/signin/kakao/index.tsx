import Loading from "@/components/commons/loading";
import useKakaoSigninMutate from "@/hooks/querys/useKakaoSigninMutate";
import useKakaoUserInfoMutate from "@/hooks/querys/useKakaoUserInfoMutate";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function KakaoAuth() {
  const params = useSearchParams();
  const code = params.get("code");
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
