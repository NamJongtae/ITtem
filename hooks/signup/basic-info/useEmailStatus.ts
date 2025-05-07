import useSignupStore from "@/store/signup-store";
import { useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function useEmailStatus() {
  const { formState } = useFormContext();
  const actions = useSignupStore((state) => state.actions);
  const isSendToVerifyEmail = useSignupStore(
    (state) => state.isSendToVerifyEmail
  );
  const isVerifiedEmail = useSignupStore((state) => state.isVerifiedEmail);
  const isDirty = formState.dirtyFields["email"];
  const errors = formState.errors["email"];

  const resetSendToVerifyEmail = useCallback(() => {
    actions.resetIsSendToVerifyEmail();
  }, [actions]);

  useEffect(() => {
    // 언마운트 시 초기화 로직
    return () => {
      actions.resetIsVerifedEmail();
    };
  }, [actions]);

  return {
    isSendToVerifyEmail,
    isVerifiedEmail,
    errors,
    isDirty,
    resetSendToVerifyEmail
  };
}
