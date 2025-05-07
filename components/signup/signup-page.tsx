"use client";

import { useSetMobileScreenSize } from "@/hooks/commons/useSetMobileScreenSize";
import SignupForm from "./signup-form";
import useSignupHandler from "@/hooks/signup/useSignupHandler";
import Loading from "../commons/loading";

export default function SignupPage() {
  useSetMobileScreenSize();
  const { onSubmit, signupLoading } = useSignupHandler();
  
  if (signupLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full px-4 md:px-8 max-w-[1024px] mx-auto h-[calc((var(--vh,1vh)*100)-113px)] md:h-[calc(100vh-127px)] overflow-hidden fixed center mt-[64px]">
      <SignupForm onSubmit={onSubmit} />
    </div>
  );
}
