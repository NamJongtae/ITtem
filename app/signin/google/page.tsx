"use client";

import Loading from "@/app/loading";
import useGoogleSigninMutate from "@/hooks/react-query/mutations/auth/useGoogleSigninMutate";
import useGoogleUserInfo from "@/hooks/react-query/mutations/auth/useGoogleUserInfoMutate";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GoogleAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code")?.toString();
  const error = searchParams.get("error")?.toString();

  const { googleSigninMutate } = useGoogleSigninMutate();
  const { googleUserInfoMutate, user } = useGoogleUserInfo();

  useEffect(() => {
    if (error) {
      router.push("/signin");
    }
  }, [error, router]);

  useEffect(() => {
    if (code) {
      console.log(code);
      googleUserInfoMutate(code as string);
    }
  }, [code, googleUserInfoMutate]);

  useEffect(() => {
    if (user) googleSigninMutate(user);
  }, [user, googleSigninMutate]);

  return <Loading />;
}
