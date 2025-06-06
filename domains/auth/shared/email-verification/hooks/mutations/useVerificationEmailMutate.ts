import verificationEmail from "../../api/verificationEmail";
import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { VerificationEmailResponseData } from "../../types/responseTypes";
import { ERROR_MESSAGE } from "@/shared/common/constants/constant";
import { EmailVerificationType } from "../../types/emailVerificationTypes";
import { useContext } from "react";
import { EmailVerificationContext } from "../../context/EmailVerificationProvider";

export default function useVerificationEmailMutate() {
  const { setEmailStatus } = useContext(EmailVerificationContext);
  const { setError, clearErrors, setValue } = useFormContext();
  const {
    mutate: verificationEmailMuate,
    isPending: verificationEmailLoading
  } = useMutation<
    AxiosResponse<VerificationEmailResponseData>,
    AxiosError,
    { email: string; verificationCode: string; type: EmailVerificationType }
  >({
    mutationFn: ({ email, verificationCode, type }) =>
      verificationEmail(email, verificationCode, type),
    onSuccess: (result) => {
      toast.success(result.data?.message);
      setEmailStatus("VERFICATION");
      clearErrors("verificationCode");
    },
    onError: (error: unknown) => {
      if (isAxiosError<VerificationEmailResponseData>(error)) {
        if (error.response?.status === 401) {
          toast.warn(error.response?.data.message);
          setError("verificationCode", {
            type: "validate",
            message: "인증코드가 일치하지 않아요."
          });
        } else if (error.response?.status === 403) {
          setEmailStatus("INITIAL");
          toast.warn(error.response?.data.message);
          setValue("verificationCode", "");
          clearErrors("verificationCode");
        } else {
          toast.warn(ERROR_MESSAGE);
        }
      }
    }
  });

  return { verificationEmailMuate, verificationEmailLoading };
}
