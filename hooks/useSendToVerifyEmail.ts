import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useFormContext } from "react-hook-form";
import useSendToVerifyEmailMutate from "./querys/useSendToVerifyEmailMutate";
import useEmailDuplicationMutate from "./querys/useEmailDuplicationMutate";
import { EmailDuplicationResponseData } from "@/types/apiTypes";
import { isAxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { signupSlice } from "@/store/signupSlice";

export default function useSendToVerifyEmail() {
  const { setError, getValues } = useFormContext();
  const isSendToVerifyEmail = useSelector(
    (state: RootState) => state.signup.isSendToVerifyEmail
  );
  const dispatch = useDispatch<AppDispatch>();
  const emailRef = useRef<HTMLInputElement | null>(null);

  const { sendToVerifyEmailMutate } = useSendToVerifyEmailMutate();

  const { emailDuplicationMuate } = useEmailDuplicationMutate();

  const handleClickSendToVerifyEmail = async () => {
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
            message: "이미 사용중인 이메일이에요.",
          });
        }
      }
      return;
    }
    dispatch(signupSlice.actions.sendToVerifyEmail());
    dispatch(signupSlice.actions.resetCounter());
    dispatch(signupSlice.actions.setSendToVerifyEmailLoading(true));
    sendToVerifyEmailMutate(email);
  };

  useEffect(() => {
    if (!isSendToVerifyEmail) {
      if (!emailRef.current) return;
      emailRef.current.focus();
    }
  }, [isSendToVerifyEmail]);

  useEffect(() => {
    return () => {
      dispatch(signupSlice.actions.resetSendToVerifyEmail());
    };
  }, []);

  return {
    isSendToVerifyEmail,
    handleClickSendToVerifyEmail,
    emailRef,
  };
}
