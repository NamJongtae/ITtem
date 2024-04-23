import Loading from "@/components/commons/loading";
import useGoogleSigninMutate from "@/hooks/querys/useGoogleSigninMutate";
import useGoogleUserInfo from "@/hooks/querys/useGoogleUserInfoMutate";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GoogleAuth() {
  const params = useSearchParams();
  const code = params.get("code");
  const { googleSigninMutate } = useGoogleSigninMutate();
  const { googleUserInfoMutate, user } = useGoogleUserInfo();

  useEffect(() => {
    if (code) {
      googleUserInfoMutate(code);
    }
  }, [code, googleUserInfoMutate]);

  useEffect(() => {
    if (user) googleSigninMutate(user);
  }, [user, googleSigninMutate]);

  return <Loading />;
}
