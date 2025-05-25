import useGlobalLoadingStore from "@/shared/common/store/globalLogingStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { changePassword } from "../api/changePassword";
import { ApiResponse } from "@/shared/common/types/responseTypes";

export default function useChangePasswordMutate({
  closeModal
}: {
  closeModal?: () => void;
} = {}) {
  const { actions } = useGlobalLoadingStore();
  const { mutate: changePasswordMutate, isPending: changePasswordLoading } =
    useMutation<
      AxiosResponse<ApiResponse>,
      AxiosError,
      {
        password: string;
        currentPassword: string;
      }
    >({
      mutationFn: async ({ password, currentPassword }) =>
        await changePassword({ password, currentPassword }),
      onMutate: () => {
        actions.startLoading();
      },
      onSuccess: async (response) => {
        if (closeModal) closeModal();
        toast.success(response.data.message);
      },
      onError: (error) => {
        if (isAxiosError<ApiResponse>(error)) {
          toast.warn(error.response?.data.message);
        }
      },
      onSettled: () => {
        actions.stopLoading();
      }
    });

  return {
    changePasswordMutate,
    changePasswordLoading
  };
}
