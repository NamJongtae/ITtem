import { changePassword } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export default function useChangePasswordMutate() {
  const {
    mutate: changePasswordMutate,
    isPending: changePasswordLoading,
    isSuccess: changePasswordSuccess,
    error: changePasswordError,
  } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError,
    { email: string; password: string; isFindPw?: boolean }
  >({
    mutationFn: async ({ email, password, isFindPw }) =>
      await changePassword({ email, password, isFindPw }),
  });
  return {
    changePasswordMutate,
    changePasswordLoading,
    changePasswordSuccess,
    changePasswordError,
  };
}
