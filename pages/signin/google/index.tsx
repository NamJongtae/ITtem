import Loading from "@/components/commons/loading";
import useGoogleSigninMutate from "@/hooks/querys/useGoogleSigninMutate";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function GoogleAuth() {
  const params = useSearchParams();
  const code = params.get("code");
  const { googleSigninMutate } = useGoogleSigninMutate();

  const fetchLogin = useCallback(async () => {
    if (code) {
      googleSigninMutate(code);
    }
  }, [code, googleSigninMutate]);

  useEffect(() => {
    fetchLogin();
  }, [code, fetchLogin]);

  return <Loading />;
}
