import { deleteAllToken, kakaoSignin } from "@/lib/api/auth";
import { authSlice } from "@/store/slice/auth-slice";
import { AppDispatch } from "@/store/store";
import {
  KakaoAuthInfoResponseData,
  SigninResponseData,
} from "@/types/api-types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function useKakaoSigninMutate() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { mutate: kakaoSigninMutate } = useMutation<
    AxiosResponse<SigninResponseData>,
    AxiosError,
    KakaoAuthInfoResponseData
  >({
    mutationFn: async (user: KakaoAuthInfoResponseData) =>
      await kakaoSignin(user),
    onSuccess: (response) => {
      dispatch(authSlice.actions.saveAuth(response.data.user));
      router.push("/");
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
            (async () => await deleteAllToken(user.id.toString()))();

            router.push(
              `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&prompt=none`
            );
          } else {
            router.replace("/signin");
          }
        } else {
          toast.warn("로그인에 실패했어요.");
          router.replace("/signin");
        }
      }
    },
  });

  return { kakaoSigninMutate };
}
