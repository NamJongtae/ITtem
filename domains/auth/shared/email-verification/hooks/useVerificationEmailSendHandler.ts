import { useFormContext } from "react-hook-form";
import useSendVerificationEmailMutate from "./mutations/useSendVerificationEmailMutate";
import { EmailVerificationType } from "../types/emailVerificationTypes";
import { useContext } from "react";
import { EmailVerificationContext } from "../context/EmailVerificationProvider";

interface IParams {
  validate: () => Promise<boolean>;
  type: EmailVerificationType;
}

export function useVerificationEmailSendHandler({ validate, type }: IParams) {
  const { getValues } = useFormContext();

  const { sendToVerificationEmailMutate } = useSendVerificationEmailMutate();
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
