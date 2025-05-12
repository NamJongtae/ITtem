import { useFormContext } from "react-hook-form";
import useSendToVerificationEmailMutate from "@/hooks/react-query/mutations/auth/useSendToVerificationEmailMutate";
import { EmailVerificationType } from "@/types/auth-types";
import { useContext } from "react";
import { EmailVerificationContext } from "@/store/EmailVerificationProvider";

interface IParams {
  validate: () => Promise<boolean>;
  type: EmailVerificationType;
}

export function useVerificationEmailSendHandler({ validate, type }: IParams) {
  const { getValues } = useFormContext();

  const { sendToVerificationEmailMutate } = useSendToVerificationEmailMutate();
  const { send } = useContext(EmailVerificationContext);

  const sendToEmail = () => {
    const email = getValues("email");
    send();
    sendToVerificationEmailMutate({ email, type });
  };

  const sendToEmailHandler = async () => {
    const isValid = await validate();
    if (!isValid) return;
    sendToEmail();
  };

  return { sendToEmailHandler };
}
