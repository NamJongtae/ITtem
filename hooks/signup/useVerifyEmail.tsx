import { useCallback, useEffect, useRef, useState } from "react";
import useVerifyEmailMutate from "../react-query/mutations/auth/useVerifyEmailMutate";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import useEmailDuplicationMutate from "../react-query/mutations/auth/useEmailDuplicationMutate";
import useSendToVerifyEmailMutate from "../react-query/mutations/auth/useSendToVerifyEmailMutate";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { signupSlice } from '@/store/signupSlice';
import useCheckEmailMutate from "../react-query/mutations/auth/useCheckEmailMutate";

export default function useVerifyEmail(isFindPw?: boolean) {
  const { getValues, clearErrors } = useFormContext();
  const verifyCodeRef = useRef<HTMLInputElement | null>(null);
  const isSendToVerifyEmail = useSelector(
    (state: RootState) => state.signup.isSendToVerifyEmail
  );
  const dispatch = useDispatch<AppDispatch>();

  const { verifyEmailMuate, verfiyEmailLoading } = useVerifyEmailMutate();
  const { emailDuplicationMuate } = useEmailDuplicationMutate();
  const { sendToVerifyEmailMutate } = useSendToVerifyEmailMutate();
  const { checkEmailMutate } = useCheckEmailMutate();

  const handleClickVerifyEmail = useCallback(async () => {
    const email = getValues("email");
    const verifyCode = getValues("verifyCode");
    if (!verifyCode) {
      toast.warn("인증번호를 입력해주세요.");
      return;
    }

    verifyEmailMuate({ email, verifyCode, isFindPw });
  }, []);

  const requestSendToVerifyEmail = useCallback(async () => {
    const email = getValues("email");

    if (!email) {
      toast.warn("이메일을 입력해주세요.");
      return;
    }

    if (isFindPw) {
      try {
        await checkEmailMutate(email);
      } catch {
        return;
      }
    } else {
      try {
        await emailDuplicationMuate(email);
      } catch (error) {
        return;
      }
    }

    clearErrors("verifyCode");
    dispatch(signupSlice.actions.resetVerifedEmail());
    dispatch(signupSlice.actions.setSendToVerifyEmailLoading(true));
    dispatch(signupSlice.actions.resetCounter());
    sendToVerifyEmailMutate({ email, isFindPw });
  }, []);

  const resetSendToVerifyEmail = useCallback(() => {
    dispatch(signupSlice.actions.resetSendToVerifyEmail());
  }, []);

  useEffect(() => {
    if (!verifyCodeRef.current) return;
    verifyCodeRef.current.focus();
  }, [isSendToVerifyEmail, verifyCodeRef]);

  useEffect(() => {
    return () => {
      dispatch(signupSlice.actions.resetVerifedEmail());
    };
  }, [dispatch]);

  return {
    handleClickVerifyEmail,
    verifyCodeRef,
    requestSendToVerifyEmail,
    resetSendToVerifyEmail,
    verfiyEmailLoading,
  };
}
