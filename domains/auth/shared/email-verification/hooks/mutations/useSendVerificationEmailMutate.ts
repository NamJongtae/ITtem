import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { VerificationEmailResponseData } from "../../types/responseTypes";
import { ERROR_MESSAGE } from "@/shared/common/constants/constant";
import { useFormContext } from "react-hook-form";
import { EmailVerificationType } from "../../types/emailVerificationTypes";
import { useContext } from "react";
import { EmailVerificationContext } from "../../context/EmailVerificationProvider";
import sendSignupVerificationEmail from "../../api/sendSignupVerificationEmail";
import sendResetPwVerificationEmail from "../../../../reset-password/api/sendResetPwVerificationEmail";

export default function useSendVerificationEmailMutate() {
  const { setIsLoading, setIsError, resetTimer, expireTimer } = useContext(
    EmailVerificationContext
  );
  const { setError } = useFormContext();
  const { mutate: sendToVerificationEmailMutate } = useMutation<
    AxiosResponse<VerificationEmailResponseData>,
    AxiosError,
    { email: string; type: EmailVerificationType }
  >({
    mutationFn: ({ email, type }) =>
      type === "resetPw"
        ? sendResetPwVerificationEmail(email)
        : sendSignupVerificationEmail(email),
    onSuccess: (result) => {
      toast.success(result.data?.message);
      setIsLoading(false);
      setIsError(false);
    },
    onError: (error: unknown) => {
      resetTimer();
      setIsLoading(false);
      if (isAxiosError<VerificationEmailResponseData>(error)) {
        setIsError(true);
        if (error.response?.status === 403) {
          setError("verificationCode", {
            type: "validate",
            message: "일일 시도 횟수를 초과했어요. (24시간 후 초기화)"
          });
          expireTimer();
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
