import { EmailVerificationContext } from '@/store/EmailVerificationProvider';
import { useContext, useEffect, useRef } from "react";

export function useEmailFocus() {
  const emailRef = useRef<HTMLInputElement | null>(null);


  const { emailStatus } = useContext(EmailVerificationContext);

  useEffect(() => {
    if (emailStatus === "INITIAL" && emailRef.current) {
      emailRef.current.focus();
    }
  }, [emailRef, emailStatus]);

  return { emailRef };
}
