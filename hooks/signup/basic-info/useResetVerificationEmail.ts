import useVerificationEmailStore from "@/store/verification-email-store";
import { useCallback, useEffect } from "react";

export default function useResetVerificationEmail() {
  const actions = useVerificationEmailStore((state) => state.actions);

  const resetSendToVerifyEmail = useCallback(() => {
    actions.resetIsSendToVerifyEmail();
  }, [actions]);

  useEffect(() => {
    // 언마운트 시 초기화 로직
    return () => {
      actions.resetIsVerifedEmail();
    };
  }, [actions]);

  return { resetSendToVerifyEmail };
}
