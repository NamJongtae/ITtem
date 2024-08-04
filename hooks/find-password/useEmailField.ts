import { useSelector } from "react-redux";
import useSendToVerifyEmail from "../signup/useSendToVerifyEmail";
import { RootState } from "@/store/store";

export default function useEmailField() {
  const { isSendToVerifyEmail, handleClickSendToVerifyEmail, emailRef } =
    useSendToVerifyEmail(true);

  const isVerifyEmail = useSelector(
    (state: RootState) => state.signup.isVerifedEmail
  );

  return {
    isSendToVerifyEmail,
    handleClickSendToVerifyEmail,
    emailRef,
    isVerifyEmail,
  };
}
