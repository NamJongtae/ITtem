import useSendToVerifyEmail from "../signup/useSendToVerifyEmail";
import useSignupStore from "@/store/signup-store";

export default function useEmailField() {
  const { isSendToVerifyEmail, handleClickSendToVerifyEmail, emailRef } =
    useSendToVerifyEmail(true);

  const isVerifiedEmail = useSignupStore((state) => state.isVerifiedEmail);

  return {
    isSendToVerifyEmail,
    handleClickSendToVerifyEmail,
    emailRef,
    isVerifiedEmail
  };
}
