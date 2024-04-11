import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useFormContext } from "react-hook-form";
import useSendToVerifyEmailMutate from "./querys/useSendToVerifyEmailMutate";
import useEmailDuplicationMutate from "./querys/useEmailDuplicationMutate";
import { EmailDuplicationResponseData } from "@/types/apiTypes";
import { isAxiosError } from "axios";

export default function useSendToVerifyEmail() {
  const { setError, getValues } = useFormContext();
  const [isSendToVerifyEmail, setIsSendToVerifyEmail] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const {
    sendToVerifyEmailMutate,
    SendToVerifyEmailLoading,
    sendToVerifyEmailError,
  } = useSendToVerifyEmailMutate();

  const { emailDuplicationMuate } = useEmailDuplicationMutate();

  const handleClickSendToEmail = async () => {
    const email = getValues("email");

    if (!email) {
      toast.warn("이메일을 입력해주세요.");
      return;
    }

    try {
      await emailDuplicationMuate(email);
    } catch (error) {
      if (isAxiosError<EmailDuplicationResponseData>(error)) {
        if (error.response?.status === 401) {
          setError("email", {
            type: "duplication",
            message: "이미 사용중인 이메일입니다.",
          });
        }
      }
      return;
    }

    setIsSendToVerifyEmail(true);
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
