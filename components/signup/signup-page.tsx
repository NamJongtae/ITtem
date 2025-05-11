"use client";

import { useSetMobileScreenSize } from "@/hooks/commons/useSetMobileScreenSize";
import SignupForm from "./signup-form";
export default function SignupPage() {
  useSetMobileScreenSize();

  return (
    <div className="w-full px-4 md:px-8 max-w-[1024px] mx-auto h-[calc((var(--vh,1vh)*100)-113px)] md:h-[calc(100vh-127px)] overflow-hidden fixed center mt-[64px]">
      <SignupForm />
    </div>
  );
}
