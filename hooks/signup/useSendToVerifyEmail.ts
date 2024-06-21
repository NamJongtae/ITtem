import { useCallback, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useFormContext } from "react-hook-form";
import useSendToVerifyEmailMutate from "../reactQuery/mutations/auth/useSendToVerifyEmailMutate";
import useEmailDuplicationMutate from "../reactQuery/mutations/auth/useEmailDuplicationMutate";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { signupSlice } from "@/store/signupSlice";
import useCheckEmailMutate from "../reactQuery/mutations/auth/useCheckEmailMutate";

export default function useSendToVerifyEmail(isFindPw?: boolean) {
  const { getValues } = useFormContext();
  const isSendToVerifyEmail = useSelector(
    (state: RootState) => state.signup.isSendToVerifyEmail
  );
  const dispatch = useDispatch<AppDispatch>();
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

    dispatch(signupSlice.actions.sendToVerifyEmail());
    dispatch(signupSlice.actions.resetCounter());
    dispatch(signupSlice.actions.setSendToVerifyEmailLoading(true));
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
      dispatch(signupSlice.actions.resetSendToVerifyEmail());
    };
  }, []);

  return {
    isSendToVerifyEmail,
    handleClickSendToVerifyEmail,
    emailRef,
  };
}
