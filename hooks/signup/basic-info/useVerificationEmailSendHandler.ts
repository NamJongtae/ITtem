import { useFormContext } from 'react-hook-form';
import useSendToVerifyEmailMutate from '@/hooks/react-query/mutations/auth/useSendToVerifyEmailMutate';
import useSignupStore from "@/store/signup-store";

export function useVerificationEmailSendHandler() {
  const { getValues } = useFormContext();
  const actions = useSignupStore((state) => state.actions);
  const { sendToVerifyEmailMutate } = useSendToVerifyEmailMutate();

  const sendToEmail = (isFindPw: boolean) => {
    const email = getValues("email");
    actions.sendToVerifyEmail();
    actions.resetTimer();
    actions.setSendToVerifyEmailLoading(true);
    sendToVerifyEmailMutate({ email, isFindPw });
  };

  return { sendToEmail };
}
