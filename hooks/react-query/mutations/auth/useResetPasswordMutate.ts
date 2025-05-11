import { resetPassword } from "@/lib/api/auth";
import useGlobalLoadingStore from "@/store/global-loging-store";
import useVerificationEmailStore from "@/store/verification-email-store";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useResetPasswordMutate() {
  const router = useRouter();
  const { actions: verificationEmailActions } = useVerificationEmailStore();
  const { actions: globalLoadingActions } = useGlobalLoadingStore();
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
      onMutate: () => {
        globalLoadingActions.startLoading();
      },
      onSuccess: async (response) => {
        verificationEmailActions.resetIsSendToVerificationEmail();
        verificationEmailActions.resetIsVerifedEmail();
        verificationEmailActions.resetTimer();
        router.push("/signin");

        toast.success(response.data.message);
      },
      onError: (error) => {
        if (isAxiosError<{ message: string }>(error)) {
          toast.warn(error.response?.data.message);
        }
      },
      onSettled: () => {
        globalLoadingActions.stopLoading();
      }
    });

  return {
    resetPasswordMutate,
    resetPasswordLoading
  };
}
