import { useFormContext } from "react-hook-form";
import useSendToVerificationEmailMutate from '@/hooks/react-query/mutations/auth/useSendToVerificationEmailMutate';
import useVerificationEmailStore from "@/store/verification-email-store";
import { useCallback } from "react";

interface IParams {
  validate: () => Promise<boolean>;
  isFindPw: boolean;
}

export function useVerificationEmailSendHandler({
  validate,
  isFindPw
}: IParams) {
  const { getValues } = useFormContext();
  const actions = useVerificationEmailStore((state) => state.actions);
  const { sendToVerificationEmailMutate } = useSendToVerificationEmailMutate();

  const sendToEmail = useCallback(() => {
    const email = getValues("email");
    actions.sendToVerificationEmail();
    actions.resetTimer();
    actions.setSendToVerificationEmailLoading(true);
    sendToVerificationEmailMutate({ email, isFindPw });
  }, [actions, getValues, sendToVerificationEmailMutate, isFindPw]);

  const sendToEmailHandler = useCallback(async () => {
    const isValid = await validate();
    if (!isValid) return;
    sendToEmail();
  }, [validate, sendToEmail]);

  return { sendToEmailHandler };
}
