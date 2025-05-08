import useVerificationEmailStore from '@/store/verification-email-store';
import { useEffect, useRef } from "react";

export default function useVerificationCodeFocus() {
  const verificationCodeRef = useRef<HTMLInputElement | null>(null);
  const isSendToVerificationEmail = useVerificationEmailStore(
    (state) => state.isSendToVerificationEmail
  );

  useEffect(() => {
    if (!verificationCodeRef.current) return;
    verificationCodeRef.current.focus();
  }, [isSendToVerificationEmail, verificationCodeRef]);

  return { verificationCodeRef };
}
