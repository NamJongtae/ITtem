import { changePassword } from "@/lib/api/auth";
import useGlobalLoadingStore from "@/store/global-loging-store";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function useChangePasswordMutate({
  closeModal
}: {
  closeModal?: () => void;
} = {}) {
  const { actions } = useGlobalLoadingStore();
  const { mutate: changePasswordMutate, isPending: changePasswordLoading } =
    useMutation<
      AxiosResponse<{ message: string }>,
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
        if (isAxiosError<{ message: string }>(error)) {
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
