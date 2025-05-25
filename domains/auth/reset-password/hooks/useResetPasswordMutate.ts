import useGlobalLoadingStore from "@/shared/common/store/globalLogingStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { resetPassword } from "../api/resetPassword";
import { ApiResponse } from "@/shared/common/types/responseTypes";

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
