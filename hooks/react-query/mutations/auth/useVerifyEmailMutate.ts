import { verifyEmail } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { VerifyEmailResponseData } from "@/types/api-types";
import { ERROR_MESSAGE } from "@/constants/constant";
import useSignupStore from "@/store/signup-store";

export default function useVerifyEmailMutate() {
  const actions = useSignupStore(state=>state.actions);
  const { setError, clearErrors, setValue } = useFormContext();
  const { mutate: verifyEmailMuate, isPending: verfiyEmailLoading } =
    useMutation<
      AxiosResponse<VerifyEmailResponseData>,
      AxiosError,
      { email: string; verifyCode: string; isFindPw?: boolean }
    >({
      mutationFn: ({ email, verifyCode, isFindPw }) =>
        verifyEmail(email, verifyCode, isFindPw),
      onSuccess: (result) => {
        toast.success(result.data?.message);
        actions.verifyEmail();
        clearErrors("verifyCode");
      },
      onError: (error: unknown) => {
        if (isAxiosError<VerifyEmailResponseData>(error)) {
          if (error.response?.status === 401) {
            toast.warn(error.response?.data.message);
            setError("verifyCode", {
              type: "validate",
              message: "인증코드가 일치하지 않아요."
            });
          } else if (error.response?.status === 403) {
            actions.resetIsSendToVerifyEmail();
            toast.warn(error.response?.data.message);
            setValue("verifyCode", "");
            clearErrors("verifyCode");
          } else {
            toast.warn(ERROR_MESSAGE);
          }
        }
      }
    });

  return { verifyEmailMuate, verfiyEmailLoading };
}
