import { queryKeys } from "@/query-keys/query-keys";
import useAuthStore from "../../../store/auth-store";
import {
  GoogleAuthInfoResponseData,
  SigninResponseData
} from "../../../types/response-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import deleteAllToken from "../../../api/deleteToken";
import googleSignin from "../../../api/signin/googleSignin";

export default function useGoogleSigninMutate() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const actions = useAuthStore((state) => state.actions);
  const { mutate: googleSigninMutate } = useMutation<
    AxiosResponse<SigninResponseData>,
    AxiosError,
    GoogleAuthInfoResponseData
  >({
    mutationFn: async (user: GoogleAuthInfoResponseData) =>
      await googleSignin(user),
    onSuccess: (response) => {
      actions.setAuth(response.data.user);
      queryClient.refetchQueries({ queryKey: queryKeys.session._def });

      router.replace("/");
    },
    onError: (error, variables) => {
      if (isAxiosError<{ message: string; email: string }>(error)) {
        if (error.response?.status == 409) {
          const isLogin = confirm(
            "제대로 로그아웃 하지 않았거나\n이미 로그인중인 아이디입니다.\n현재 사용중인 브라우저에서 로그아웃 하겠습니까?"
          );
          if (isLogin) {
            const user = variables;
            // 토큰 삭제 로직
            (async () => await deleteAllToken(user.email))();

            router.push(
              `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`
            );
          } else {
            router.replace("/signin");
          }
        } else {
          toast.warn("로그인에 실패했어요.");
          router.replace("/signin");
        }
      }
    }
  });

  return { googleSigninMutate };
}
