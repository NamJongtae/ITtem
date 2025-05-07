import useSignupStore from "@/store/signup-store";
import { useEffect, useRef } from "react";

export default function useVerifyCodeInputFocus() {
  const verifyCodeRef = useRef<HTMLInputElement | null>(null);
  const isSendToVerifyEmail = useSignupStore(
    (state) => state.isSendToVerifyEmail
  );

  useEffect(() => {
    if (!verifyCodeRef.current) return;
    verifyCodeRef.current.focus();
  }, [isSendToVerifyEmail, verifyCodeRef]);

  return { verifyCodeRef };
}
