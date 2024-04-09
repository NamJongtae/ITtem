import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useFormContext } from "react-hook-form";
import useSendToVerifyEmailMutate from "./querys/useSendToVerifyEmailMutate";

export default function useSendToVerifyEmail() {
  const { setError, getValues } = useFormContext();
  const [isSendToVerifyEmail, setIsSendToVerifyEmail] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const {
    sendToVerifyEmailMutate,
    SendToVerifyEmailLoading,
    sendToVerifyEmailError,
  } = useSendToVerifyEmailMutate();

  const handleClickSendToEmail = async () => {
    const email = getValues("email");
    if (!email) {
      toast.warn("이메일을 입력해주세요.");
      return;
    }
    setIsSendToVerifyEmail(true);
    setError("verifyNumber", {
      type: "validate",
      message: "",
    });
    sendToVerifyEmailMutate(email);
  };

  const successSendToVerifyEmail = () => {
    setIsSendToVerifyEmail(true);
  };

  const requestSendToVerifyEmail = async () => {
    handleClickSendToEmail();
  };

  const resetSendToVerifyEmail = () => {
    setIsSendToVerifyEmail(false);
    if (!emailRef.current) return;
    emailRef.current.focus();
  };

  return {
    isSendToVerifyEmail,
    handleClickSendToEmail,
    SendToVerifyEmailLoading,
    successSendToVerifyEmail,
    resetSendToVerifyEmail,
    emailRef,
    sendToVerifyEmailError,
    requestSendToVerifyEmail,
  };
}
