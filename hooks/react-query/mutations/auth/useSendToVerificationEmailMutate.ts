import { sendToVerificationEmail } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { VerificationEmailResponseData } from "@/types/api-types";
import { ERROR_MESSAGE } from "@/constants/constant";
import { useFormContext } from "react-hook-form";
import useVerificationEmailStore from "@/store/verification-email-store";

export default function useSendToVerificationEmailMutate() {
  const actions = useVerificationEmailStore((state) => state.actions);
  const { setError } = useFormContext();
  const { mutate: sendToVerificationEmailMutate } = useMutation<
    AxiosResponse<VerificationEmailResponseData>,
    AxiosError,
    { email: string; isFindPw?: boolean }
  >({
    mutationFn: ({ email, isFindPw }) => sendToVerificationEmail(email, isFindPw),
    onSuccess: (result) => {
      toast.success(result.data?.message);
      actions.setSendToVerificationEmailLoading(false);
      actions.setSendToVerificationEmailError(false);
    },
    onError: (error: unknown) => {
      actions.inactiveTimer();
      actions.setSendToVerificationEmailLoading(false);
      if (isAxiosError<VerificationEmailResponseData>(error)) {
        actions.setSendToVerificationEmailError(true);
        if (error.response?.status === 403) {
          actions.resetIsSendToVerificationEmail();
          toast.warn(error.response?.data.message);
          setError("verificationCode", {
            type: "validate",
            message: "일일 시도 횟수를 초과했어요."
          });
        } else {
          toast.warn(ERROR_MESSAGE);
        }
      }
    }
  });

  return {
    sendToVerificationEmailMutate
  };
}
