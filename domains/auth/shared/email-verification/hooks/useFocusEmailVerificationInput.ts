import { EmailVerificationContext } from "../context/EmailVerificationProvider";
import { useContext, useEffect, useRef } from "react";

export function useFocusEmailVerificationInput() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const { emailStatus } = useContext(EmailVerificationContext);

  useEffect(() => {
    if (emailStatus === "INITIAL" && emailRef.current) {
      emailRef.current.focus();
    }
  }, [emailRef, emailStatus]);

  return { emailRef };
}
