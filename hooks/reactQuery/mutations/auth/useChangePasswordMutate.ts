import { changePassword } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useChangePasswordMutate({
  isFindPw,
  closeModal,
}: {
  isFindPw?: boolean;
  closeModal?: () => void;
}) {
  const router = useRouter();
  const { mutate: changePasswordMutate, isPending: changePasswordLoading } =
    useMutation<
      AxiosResponse<{ message: string }>,
      AxiosError,
      {
        email?: string;
        password: string;
        currentPassword?: string;
        isFindPw?: boolean;
      }
    >({
      mutationFn: async ({ email, password, currentPassword }) =>
        await changePassword({ email, password, currentPassword, isFindPw }),
      onSuccess: async (response) => {
        if (isFindPw) {
          await router.push("/signin");
        }
        if (closeModal) closeModal();
        toast.success(response.data.message);
      },
      onError: (error) => {
        if (isAxiosError<{ message: string }>(error)) {
          toast.warn(error.response?.data.message);
        }
      },
    });
  return {
    changePasswordMutate,
    changePasswordLoading,
  };
}
