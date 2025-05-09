import { resetPassword } from "@/lib/api/auth";
import useVerificationEmailStore from "@/store/verification-email-store";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useResetPasswordMutate() {
  const router = useRouter();
  const { actions } = useVerificationEmailStore();
  const { mutate: resetPasswordMutate, isPending: resetPasswordLoading } =
    useMutation<
      AxiosResponse<{ message: string }>,
      AxiosError,
      {
        email: string;
        password: string;
      }
    >({
      mutationFn: async ({ email, password }) =>
        await resetPassword({ email, password }),
      onSuccess: async (response) => {
        actions.resetIsSendToVerificationEmail();
        actions.resetIsVerifedEmail();
        actions.resetTimer();
        router.push("/signin");

        toast.success(response.data.message);
      },
      onError: (error) => {
        if (isAxiosError<{ message: string }>(error)) {
          toast.warn(error.response?.data.message);
        }
      }
    });
  return {
    resetPasswordMutate,
    resetPasswordLoading
  };
}
