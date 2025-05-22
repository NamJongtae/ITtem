import { EmailVerificationContext } from "../../store/EmailVerificationProvider";
import { useContext, useEffect, useRef } from "react";

export default function useFocusVerificationCode() {
  const verificationCodeRef = useRef<HTMLInputElement | null>(null);
  const { emailStatus } = useContext(EmailVerificationContext);

  useEffect(() => {
    if (!verificationCodeRef.current) return;
    if (emailStatus === "SEND") verificationCodeRef.current.focus();
  }, [emailStatus, verificationCodeRef]);

  return { verificationCodeRef };
}
