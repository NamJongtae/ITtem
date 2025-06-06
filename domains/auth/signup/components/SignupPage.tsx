"use client";

import { useSetMobileScreenSize } from "@/shared/common/hooks/useSetMobileScreenSize";
import SignupForm from "./SignupForm";
export default function SignupPage() {
  useSetMobileScreenSize();

  return (
    <div className="w-full px-4 md:px-8 max-w-[1024px] mx-auto h-[calc((var(--vh,1vh)*100)-113px)] md:h-[calc(100vh-127px)] overflow-hidden fixed center mt-[64px]">
      <SignupForm />
    </div>
  );
}
