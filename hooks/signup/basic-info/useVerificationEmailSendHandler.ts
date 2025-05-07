import { useFormContext } from "react-hook-form";
import useSendToVerifyEmailMutate from "@/hooks/react-query/mutations/auth/useSendToVerifyEmailMutate";
import useSignupStore from "@/store/signup-store";
import { useCallback } from "react";

interface IParams {
  validate: () => Promise<boolean>;
}

export function useVerificationEmailSendHandler({ validate }: IParams) {
  const { getValues } = useFormContext();
  const actions = useSignupStore((state) => state.actions);
  const { sendToVerifyEmailMutate } = useSendToVerifyEmailMutate();

  const sendToEmail = useCallback(
    (isFindPw: boolean) => {
      const email = getValues("email");
      actions.sendToVerifyEmail();
      actions.resetTimer();
      actions.setSendToVerifyEmailLoading(true);
      sendToVerifyEmailMutate({ email, isFindPw });
    },
    [actions, getValues, sendToVerifyEmailMutate]
  );

  const sendToEmailHandler = useCallback(async () => {
    const isValid = await validate();
    if (!isValid) return;
    sendToEmail(false);
  }, [validate, sendToEmail]);

  return { sendToEmailHandler };
}
