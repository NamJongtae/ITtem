import { useCallback, useEffect } from "react";
import useSignupStore from "@/store/signup-store";

export default function useVerifyCodeInput() {
  const actions = useSignupStore((state) => state.actions);

  const resetSendToVerifyEmail = useCallback(() => {
    actions.resetIsSendToVerifyEmail();
  }, [actions]);

  useEffect(() => {
    return () => {
      actions.resetIsVerifedEmail();
    };
  }, [actions]);

  return {
    resetSendToVerifyEmail
  };
}
