import { verifyEmail } from "@/lib/api/signup";
import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { VerifyEmailResponseData } from "@/types/apiTypes";
import { ERROR_MESSAGE } from "@/constants/constant";

export default function useVerifyEmailMutate(sucessVeriedEmail: () => void) {
  const { clearErrors } = useFormContext();
  const { mutate: verifyEmailMuate } = useMutation<
    AxiosResponse<VerifyEmailResponseData>,
    AxiosError,
    { email: string; verifyCode: string }
  >({
    mutationFn: ({
      email,
      verifyCode,
    }: {
      email: string;
      verifyCode: string;
    }) => verifyEmail(email, verifyCode),
    onSuccess: (result) => {
      toast.success(result.data?.message);
      sucessVeriedEmail();
      clearErrors("verifyCode");
    },
    onError: (error: unknown) => {
      if (isAxiosError<VerifyEmailResponseData, any>(error)) {
        if (error.response?.status === 401) {
          toast.warn(error.response?.data.message);
        } else {
          toast.warn(ERROR_MESSAGE);
        }
      }
    },
  });

  return { verifyEmailMuate };
}
