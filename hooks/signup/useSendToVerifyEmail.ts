import { useCallback, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useFormContext } from "react-hook-form";
import useSendToVerifyEmailMutate from "../react-query/mutations/auth/useSendToVerifyEmailMutate";
import useEmailDuplicationMutate from "../react-query/mutations/auth/useEmailDuplicationMutate";
import useCheckEmailMutate from "../react-query/mutations/auth/useCheckEmailMutate";
import useSignupStore from "@/store/signup-store";

export default function useSendToVerifyEmail(isFindPw?: boolean) {
  const { getValues } = useFormContext();
  const actions = useSignupStore((state) => state.actions);
  const isSendToVerifyEmail = useSignupStore(
    (state) => state.isSendToVerifyEmail
  );
  const emailRef = useRef<HTMLInputElement | null>(null);

  const { sendToVerifyEmailMutate } = useSendToVerifyEmailMutate();
  const { emailDuplicationMuate } = useEmailDuplicationMutate();
  const { checkEmailMutate } = useCheckEmailMutate();

  const handleClickSendToVerifyEmail = useCallback(async () => {
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

    actions.sendToVerifyEmail();
    actions.resetTimer();
    actions.setSendToVerifyEmailLoading(true);
    sendToVerifyEmailMutate({ email, isFindPw });
  }, []);

  useEffect(() => {
    if (!isSendToVerifyEmail) {
      if (!emailRef.current) return;
      emailRef.current.focus();
    }
  }, [isSendToVerifyEmail]);

  useEffect(() => {
    return () => {
      actions.resetIsSendToVerifyEmail();
    };
  }, []);

  return {
    isSendToVerifyEmail,
    handleClickSendToVerifyEmail,
    emailRef
  };
}
