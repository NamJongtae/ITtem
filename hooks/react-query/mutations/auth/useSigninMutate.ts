import { ERROR_MESSAGE } from "@/constants/constant";
import { sigin } from "@/lib/api/auth";
import { queryKeys } from "@/query-keys/query-keys";
import useAuthStore from "@/store/auth-store";
import useGlobalLoadingStore from "@/store/global-loging-store";
import { SigninResponseData } from "@/types/api-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
      setTimeout(() => {
        router.refresh(); // middleware 버그 해결을 위해 router refresh
      }, 100);
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
