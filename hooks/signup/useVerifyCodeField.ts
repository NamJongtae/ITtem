import useSignupStore from "@/store/signup-store";
import useVerifyEmail from "./useVerifyEmail";
import { useFormContext } from "react-hook-form";

export default function useVerifyCodeField() {
  const {
    handleClickVerifyEmail,
    requestSendToVerifyEmail,
    resetSendToVerifyEmail,
    verifyCodeRef,
    verfiyEmailLoading
  } = useVerifyEmail();

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
    isSendToVerifyEmail,
    isVerifiedEmail,
    error
  };
}
