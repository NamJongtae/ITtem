"use client";

import Loading from "@/shared/common/components/Loading";
import useGoogleSigninMutate from "@/domains/auth/signin/hooks/mutations/useGoogleSigninMutate";
import useGoogleUserInfo from "@/domains/auth/signin/hooks/mutations/useGoogleUserInfoMutate";
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
      googleUserInfoMutate(code as string);
    }
  }, [code, googleUserInfoMutate]);

  useEffect(() => {
    if (user) googleSigninMutate(user);
  }, [user, googleSigninMutate]);

  return <Loading />;
}
