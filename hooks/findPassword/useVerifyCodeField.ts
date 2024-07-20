import useVerifyEmail from "../signup/useVerifyEmail";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useFormContext } from "react-hook-form";

export default function useVerifyCodeField() {
  const {
    handleClickVerifyEmail,
    requestSendToVerifyEmail,
    resetSendToVerifyEmail,
    verifyCodeRef,
    verfiyEmailLoading,
  } = useVerifyEmail(true);

  const isSendToVerifyEmail = useSelector(
    (state: RootState) => state.signup.isSendToVerifyEmail
  );
  const isVerifiedEmail = useSelector(
    (state: RootState) => state.signup.isVerifedEmail
  );

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
    isVerifiedEmail,
  };
}
