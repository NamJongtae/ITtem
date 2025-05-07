import { useCallback } from 'react';
import { useFormContext } from "react-hook-form";
import { toast } from 'react-toastify';
import useEmailDuplicationMutate from '../../react-query/mutations/auth/useEmailDuplicationMutate';
import useSendToVerifyEmailMutate from '../../react-query/mutations/auth/useSendToVerifyEmailMutate';
import useCheckEmailMutate from '../../react-query/mutations/auth/useCheckEmailMutate';
import useSignupStore from '@/store/signup-store';

export default function useRequestSendToVerifyEmailHandler(isFindPw: boolean) {
  const { getValues, clearErrors } = useFormContext();
  const actions = useSignupStore((state) => state.actions);

  const { emailDuplicationMuate } = useEmailDuplicationMutate();
  const { sendToVerifyEmailMutate } = useSendToVerifyEmailMutate();
  const { checkEmailMutate } = useCheckEmailMutate();

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
        console.error(error);
        return;
      }
    }

    clearErrors("verifyCode");
    actions.resetIsVerifedEmail();
    actions.setSendToVerifyEmailLoading(true);
    actions.resetTimer();
    sendToVerifyEmailMutate({ email, isFindPw });
  }, [actions, checkEmailMutate, clearErrors, emailDuplicationMuate, getValues, isFindPw, sendToVerifyEmailMutate]);

  return { requestSendToVerifyEmail };
}
