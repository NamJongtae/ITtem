import Loading from "@/components/commons/loading";
import useKakaoSigninMutate from "@/hooks/querys/useKakaoSigninMutate";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";

export default function KakaoAuth() {
  const params = useSearchParams();
  const code = params.get("code");
  const { kakaoSigninMutate } = useKakaoSigninMutate();

  const fetchLogin = useCallback(async () => {
    if (code) {
      kakaoSigninMutate(code);
    }
  }, [code, kakaoSigninMutate]);

  useEffect(() => {
    fetchLogin();
  }, [code, fetchLogin]);

  return <Loading />;
}
