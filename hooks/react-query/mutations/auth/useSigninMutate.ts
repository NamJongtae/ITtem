import { ERROR_MESSAGE } from "@/constants/constant";
import { sigin } from "@/lib/api/auth";
import { authSlice } from "@/store/slice/auth-slice";
import { AppDispatch } from "@/store/store";
import { SigninResponseData } from "@/types/api-types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function useSigninMutate() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { mutate: signinMutate, isPending: signinLoading } = useMutation<
    AxiosResponse<SigninResponseData>,
    AxiosError,
    { email: string; password: string; isDuplicationLogin?: boolean }
  >({
    mutationFn: async ({
      email,
      password,
      isDuplicationLogin,
    }: {
      email: string;
      password: string;
      isDuplicationLogin?: boolean;
    }) => await sigin(email, password, isDuplicationLogin),
    onSuccess: async (response) => {
      dispatch(authSlice.actions.saveAuth(response.data.user));
      router.back();
    },
    onError: (error: unknown, variables) => {
      if (isAxiosError<SigninResponseData, any>(error)) {
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
              isDuplicationLogin: true,
            });
          }
        } else {
          toast.warn(ERROR_MESSAGE);
        }
      }
    },
  });
  return { signinMutate, signinLoading };
}
