import Loading from "@/components/commons/loading";
import useGoogleSigninMutate from "@/hooks/reactQuery/mutations/auth/useGoogleSigninMutate";
import useGoogleUserInfo from "@/hooks/reactQuery/mutations/auth/useGoogleUserInfoMutate";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function GoogleAuth() {
  const router = useRouter();
  const code = router.query?.code;
  const error = router.query?.error;
  const { googleSigninMutate } = useGoogleSigninMutate();
  const { googleUserInfoMutate, user } = useGoogleUserInfo();

  useEffect(() => {
    if (error) {
      router.push("/signin");
    }
  }, [error, router]);

  useEffect(() => {
    if (code) {
      googleUserInfoMutate(code as string);
    }
  }, [code, googleUserInfoMutate]);

  useEffect(() => {
    if (user) googleSigninMutate(user);
  }, [user, googleSigninMutate]);

  return <Loading />;
}
