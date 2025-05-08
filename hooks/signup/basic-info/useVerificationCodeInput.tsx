import { useCallback, useEffect } from "react";
import useVerificationEmailStore from "@/store/verification-email-store";

export default function useVerificationCodeInput() {
  const actions = useVerificationEmailStore((state) => state.actions);

  const resetSendToVerificationEmail = useCallback(() => {
    actions.resetIsSendToVerificationEmail();
  }, [actions]);

  useEffect(() => {
    return () => {
      actions.resetIsVerifedEmail();
    };
  }, [actions]);

  return {
    resetSendToVerificationEmail
  };
}
