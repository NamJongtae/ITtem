import { EmailVerificationContext } from '@/store/EmailVerificationProvider';
import { useContext, useEffect } from "react";

export function useResetEmailSendStatus() {
  const { setEmailStatus } = useContext(EmailVerificationContext);
  useEffect(() => {
    return () => {
      setEmailStatus("INITIAL");
    };
  }, [setEmailStatus]);
}
