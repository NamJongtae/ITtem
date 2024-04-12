import { useEffect, useRef, useState } from "react";
import useVerifyEmailMutate from "./querys/useVerifyEmailMutate";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import useEmailDuplicationMutate from "./querys/useEmailDuplicationMutate";
import { EmailDuplicationResponseData } from "@/types/apiTypes";
import { isAxiosError } from "axios";
import useSendToVerifyEmailMutate from "./querys/useSendToVerifyEmailMutate";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { signupSlice } from "@/store/signupSlice";

export default function useVerifyEmail() {
  const { getValues, setError } = useFormContext();
  const verifyCodeRef = useRef<HTMLInputElement | null>(null);
  const isSendToVerifyEmail = useSelector(
    (state: RootState) => state.signup.isSendToVerifyEmail
  );
  const dispatch = useDispatch<AppDispatch>();

  const { verifyEmailMuate } = useVerifyEmailMutate();
  const { emailDuplicationMuate } = useEmailDuplicationMutate();
  const { sendToVerifyEmailMutate } = useSendToVerifyEmailMutate();

  const handleClickVerifyEmail = async () => {
    const email = getValues("email");
    const verifyCode = getValues("verifyCode");
    if (!verifyCode) {
      toast.warn("인증번호를 입력해주세요.");
      return;
    }

    verifyEmailMuate({ email, verifyCode });
  };

  const requestSendToVerifyEmail = async () => {
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

    dispatch(signupSlice.actions.resetVerifedEmail());
    dispatch(signupSlice.actions.setSendToVerifyEmailLoading(true));
    sendToVerifyEmailMutate(email);
  };

  const resetSendToVerifyEmail = () => {
    dispatch(signupSlice.actions.resetSendToVerifyEmail());
  };

  useEffect(() => {
    if (!verifyCodeRef.current) return;
    verifyCodeRef.current.focus();
  }, [isSendToVerifyEmail, verifyCodeRef]);

  useEffect(() => {
    return () => {
      dispatch(signupSlice.actions.resetVerifedEmail());
    };
  }, []);

  return {
    handleClickVerifyEmail,
    verifyCodeRef,
    requestSendToVerifyEmail,
    resetSendToVerifyEmail,
  };
}
