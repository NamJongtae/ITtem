import { ERROR_MESSAGE } from "@/constants/constant";
import { createAccount } from "@/lib/api/auth";
import { queryKeys } from "@/query-keys/query-keys";
import useAuthStore from "@/store/auth-store";
import useGlobalLoadingStore from "@/store/global-loging-store";
import { SignupResponseData } from "@/types/api-types";
import { SignupData } from "@/types/auth-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useSignupMutate() {
  const router = useRouter();
  const { actions: authActions } = useAuthStore();
  const { actions: globalLoadingActions } = useGlobalLoadingStore();
  const queryClient = useQueryClient();
  const {
    mutate: signupMutate,
    isPending: signupLoading,
    data
  } = useMutation<AxiosResponse<SignupResponseData>, AxiosError, SignupData>({
    mutationFn: ({ email, password, profileImgFile, nickname, introduce }) =>
      createAccount({
        email,
        password,
        profileImgFile,
        nickname,
        introduce
      }),
    onMutate: () => {
      globalLoadingActions.startLoading();
    },
    onSuccess: (result) => {
      toast.success(result.data?.message);
      authActions.setAuth(result.data.user);
      queryClient.refetchQueries({ queryKey: queryKeys.session._def });
      router.push("/");
    },
    onError: (error: unknown) => {
      if (isAxiosError<SignupResponseData>(error)) {
        if (error.response?.status === 422 || error.response?.status === 500) {
          toast.warn(error.response?.data.message);
        } else {
          toast.warn(ERROR_MESSAGE);
        }
      }
    },
    onSettled: () => {
      globalLoadingActions.stopLoading();
    }
  });

  return { signupMutate, signupLoading, data };
}
