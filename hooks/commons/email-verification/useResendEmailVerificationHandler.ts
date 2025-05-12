import { useCallback, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import useEmailDuplicationMutate from "../../react-query/mutations/auth/useEmailDuplicationMutate";
import useSendToVerificationEmailMutate from "../../react-query/mutations/auth/useSendToVerificationEmailMutate";
import useCheckEmailMutate from "../../react-query/mutations/auth/useCheckEmailMutate";
import { EmailVerificationType } from "@/types/auth-types";
import { EmailVerificationContext } from "@/store/EmailVerificationProvider";

export default function useResendEmailVerificationHandler(
  type: EmailVerificationType
) {
  const { getValues, clearErrors } = useFormContext();
  const { send } = useContext(EmailVerificationContext);

  const { emailDuplicationMuate } = useEmailDuplicationMutate();
  const { sendToVerificationEmailMutate } = useSendToVerificationEmailMutate();
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
