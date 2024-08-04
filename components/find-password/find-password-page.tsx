"use client";

import Form from "./find-password-form";
import { useSetMobileScreenSize } from "@/hooks/commons/useSetMobileScreenSize";

export default function FindPasswordPage() {
  useSetMobileScreenSize();
  return (
    <div className="w-full h-[calc((var(--vh,1vh)*100)-113px)] md:h-[calc(100vh-127px)] px-4 md:px-8 max-w-[1024px] mx-auto overflow-hidden fixed center mt-[60px]">
      <Form />
    </div>
  );
}
