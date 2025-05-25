import { ERROR_MESSAGE } from "@/shared/common/constants/constant";
import createAccount from "../../../signup/api/createAccount";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import useGlobalLoadingStore from "@/shared/common/store/globalLogingStore";
import { SignupResponseData } from "../../types/responseTypes";
import { SignupData } from "../../types/signupTypes";
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
