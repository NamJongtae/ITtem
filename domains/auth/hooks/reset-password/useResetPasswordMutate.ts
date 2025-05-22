import useGlobalLoadingStore from "@/store/global-loging-store";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { resetPassword } from "../../api/reset-password/reset-password";
import { ApiResponse } from "@/types/response-types";

export default function useResetPasswordMutate() {
  const router = useRouter();
  const { actions: globalLoadingActions } = useGlobalLoadingStore();
  const { mutate: resetPasswordMutate, isPending: resetPasswordLoading } =
    useMutation<
      AxiosResponse<ApiResponse>,
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
