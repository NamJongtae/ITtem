import useSignupStore from "@/store/signup-store";
import { useEffect, useRef } from "react";

export function useEmailFocus() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const isSendToVerifyEmail = useSignupStore(
    (state) => state.isSendToVerifyEmail
  );

  useEffect(() => {
    if (!isSendToVerifyEmail && emailRef.current) {
      emailRef.current.focus();
    }
  }, [isSendToVerifyEmail, emailRef]);

  return { emailRef };
}
