import { useCallback, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import useEmailDuplicationMutate from "../../common/hooks/mutations/useEmailDuplicationMutate";
import useSendVerificationEmailMutate from "./mutations/useSendVerificationEmailMutate";
import useCheckEmailMutate from "../../common/hooks/mutations/useCheckEmailMutate";
import { EmailVerificationType } from "../types/emailVerificationTypes";
import { EmailVerificationContext } from "../context/EmailVerificationProvider";

export default function useResendEmailVerificationHandler(
  type: EmailVerificationType
) {
  const { getValues, clearErrors } = useFormContext();
  const { send } = useContext(EmailVerificationContext);

  const { emailDuplicationMuate } = useEmailDuplicationMutate();
  const { sendToVerificationEmailMutate } = useSendVerificationEmailMutate();
  const { checkEmailMutate } = useCheckEmailMutate();

  const requestSendToVerificationEmail = useCallback(async () => {
    const email = getValues("email");

    if (!email) {
      toast.warn("이메일을 입력해주세요.");
      return;
    }

    if (type === "resetPw") {
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

    clearErrors("verificationCode");
    send();
    sendToVerificationEmailMutate({ email, type });
  }, [
    getValues,
    type,
    clearErrors,
    send,
    sendToVerificationEmailMutate,
    checkEmailMutate,
    emailDuplicationMuate
  ]);

  return { requestSendToVerificationEmail };
}
