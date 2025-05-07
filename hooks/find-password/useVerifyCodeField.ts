import useVerifyEmail from "../signup/basic-info/useVerifyCodeInput";
import { useFormContext } from "react-hook-form";
import useSignupStore from "@/store/signup-store";

export default function useVerifyCodeField() {
  const {
    handleClickVerifyEmail,
    requestSendToVerifyEmail,
    resetSendToVerifyEmail,
    verifyCodeRef,
    verfiyEmailLoading
  } = useVerifyEmail(true);

  const isSendToVerifyEmail = useSignupStore(
    (state) => state.isSendToVerifyEmail
  );
  const isVerifiedEmail = useSignupStore((state) => state.isVerifiedEmail);

  const { formState } = useFormContext();

  const error = formState.errors["verifyCode"];

  return {
    handleClickVerifyEmail,
    requestSendToVerifyEmail,
    resetSendToVerifyEmail,
    verifyCodeRef,
    verfiyEmailLoading,
    error,
    isSendToVerifyEmail,
    isVerifiedEmail
  };
}
