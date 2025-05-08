import useVerificationEmailStore from '@/store/verification-email-store';
import { useEffect, useRef } from "react";

export function useEmailFocus() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const isSendToVerificationEmail = useVerificationEmailStore(
    (state) => state.isSendToVerificationEmail
  );

  useEffect(() => {
    if (!isSendToVerificationEmail && emailRef.current) {
      emailRef.current.focus();
    }
  }, [isSendToVerificationEmail, emailRef]);

  return { emailRef };
}
