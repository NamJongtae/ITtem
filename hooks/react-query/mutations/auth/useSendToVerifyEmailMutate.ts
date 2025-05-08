import { sendToVerifyEmail } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { VerifyEmailResponseData } from "@/types/api-types";
import { ERROR_MESSAGE } from "@/constants/constant";
import { useFormContext } from "react-hook-form";
import useVerificationEmailStore from "@/store/verification-email-store";

export default function useSendToVerifyEmailMutate() {
  const actions = useVerificationEmailStore((state) => state.actions);
  const { setError } = useFormContext();
  const { mutate: sendToVerifyEmailMutate } = useMutation<
    AxiosResponse<VerifyEmailResponseData>,
    AxiosError,
    { email: string; isFindPw?: boolean }
  >({
    mutationFn: ({ email, isFindPw }) => sendToVerifyEmail(email, isFindPw),
    onSuccess: (result) => {
      toast.success(result.data?.message);
      actions.setSendToVerifyEmailLoading(false);
      actions.setSendToVerifyEmailError(false);
    },
    onError: (error: unknown) => {
      actions.inactiveTimer();
      actions.setSendToVerifyEmailLoading(false);
      if (isAxiosError<VerifyEmailResponseData>(error)) {
        actions.setSendToVerifyEmailError(true);
        if (error.response?.status === 403) {
          actions.resetIsSendToVerifyEmail();
          toast.warn(error.response?.data.message);
          setError("verifyCode", {
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
    sendToVerifyEmailMutate
  };
}
