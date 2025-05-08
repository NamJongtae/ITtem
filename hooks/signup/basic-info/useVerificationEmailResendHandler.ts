import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import useEmailDuplicationMutate from "../../react-query/mutations/auth/useEmailDuplicationMutate";
import useSendToVerificationEmailMutate from "../../react-query/mutations/auth/useSendToVerificationEmailMutate";
import useCheckEmailMutate from "../../react-query/mutations/auth/useCheckEmailMutate";
import useVerificationEmailStore from "@/store/verification-email-store";

export default function useVerificationEmailResendHandler(isFindPw: boolean) {
  const { getValues, clearErrors } = useFormContext();
  const actions = useVerificationEmailStore((state) => state.actions);

  const { emailDuplicationMuate } = useEmailDuplicationMutate();
  const { sendToVerificationEmailMutate } = useSendToVerificationEmailMutate();
  const { checkEmailMutate } = useCheckEmailMutate();

  const requestSendToVerificationEmail = useCallback(async () => {
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

    clearErrors("verificationCode");
    actions.resetIsVerifedEmail();
    actions.setSendToVerificationEmailLoading(true);
    actions.resetTimer();
    sendToVerificationEmailMutate({ email, isFindPw });
  }, [
    actions,
    checkEmailMutate,
    clearErrors,
    emailDuplicationMuate,
    getValues,
    isFindPw,
    sendToVerificationEmailMutate
  ]);

  return { requestSendToVerificationEmail };
}
