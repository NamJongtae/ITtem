import { ERROR_MESSAGE } from "@/shared/common/constants/constant";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import useGlobalLoadingStore from "@/shared/common/store/globalLogingStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import sigin from "../../../signin/api/signin";
import { SigninResponseData } from "../../types/responseTypes";

export default function useSigninMutate({ isModal }: { isModal?: boolean }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { actions: authActions } = useAuthStore();
  const { actions: globalLoadingActions } = useGlobalLoadingStore();
  const { mutate: signinMutate, isPending: signinLoading } = useMutation<
    AxiosResponse<SigninResponseData>,
    AxiosError,
    { email: string; password: string; isDuplicationLogin?: boolean }
  >({
    mutationFn: async ({
      email,
      password,
      isDuplicationLogin
    }: {
      email: string;
      password: string;
      isDuplicationLogin?: boolean;
    }) => await sigin(email, password, isDuplicationLogin),
    onMutate: () => {
      globalLoadingActions.startLoading();
    },
    onSuccess: async (response) => {
      authActions.setAuth(response.data.user);
      queryClient.refetchQueries({ queryKey: queryKeys.session._def });
      if (isModal) {
        router.back();
      } else {
        router.push("/");
      }
    },
    onError: (error: unknown, variables) => {
      if (isAxiosError<SigninResponseData>(error)) {
        if (error.response?.status === 401) {
          toast.warn(error.response?.data.message);
        } else if (error.response?.status == 409) {
          const isLogin = confirm(
            "제대로 로그아웃 하지 않았거나\n이미 로그인중인 아이디입니다.\n현재 사용중인 브라우저에서 로그아웃 하겠습니까?"
          );
          if (isLogin) {
            const { email, password } = variables;
            signinMutate({
              email,
              password,
              isDuplicationLogin: true
            });
          }
        } else {
          toast.warn(ERROR_MESSAGE);
        }
      }
    },
    onSettled: () => {
      authActions.setIsLoading(false);
      globalLoadingActions.stopLoading();
    }
  });

  return { signinMutate, signinLoading };
}
