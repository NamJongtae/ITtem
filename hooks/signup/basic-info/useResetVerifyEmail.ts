import useSignupStore from "@/store/signup-store";
import { useCallback, useEffect } from "react";

export default function useResetVerifyEmail() {
  const actions = useSignupStore((state) => state.actions);

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
