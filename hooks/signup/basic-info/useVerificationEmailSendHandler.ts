import { useFormContext } from "react-hook-form";
import useSendToVerificationEmailMutate from "@/hooks/react-query/mutations/auth/useSendToVerificationEmailMutate";
import useVerificationEmailStore from "@/store/verification-email-store";
import { VerificationEmailType } from "@/types/auth-types";

interface IParams {
  validate: () => Promise<boolean>;
  type: VerificationEmailType;
}

export function useVerificationEmailSendHandler({ validate, type }: IParams) {
  const { getValues } = useFormContext();
  const actions = useVerificationEmailStore((state) => state.actions);
  const { sendToVerificationEmailMutate } = useSendToVerificationEmailMutate();

  const sendToEmail = () => {
    const email = getValues("email");
    actions.sendToVerificationEmail();
    actions.resetTimer();
    actions.setSendToVerificationEmailLoading(true);
    sendToVerificationEmailMutate({ email, type });
  };

  const sendToEmailHandler = async () => {
    const isValid = await validate();
    if (!isValid) return;
    sendToEmail();
  };

  return { sendToEmailHandler };
}
