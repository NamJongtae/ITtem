import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import {
  KakaoAuthInfoResponseData,
  SigninResponseData
} from "../../types/responseTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import kakaoSignin from "../../../signin/api/kakaoSignin";
import destoryDBSession from "@/domains/auth/shared/common/api/destoryDBSession";

export default function useKakaoSigninMutate() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const actions = useAuthStore((state) => state.actions);
  const { mutate: kakaoSigninMutate } = useMutation<
    AxiosResponse<SigninResponseData>,
    AxiosError,
    KakaoAuthInfoResponseData
  >({
    mutationFn: async (user: KakaoAuthInfoResponseData) =>
      await kakaoSignin(user),
    onSuccess: (response) => {
      actions.setAuth(response.data.user);
      queryClient.refetchQueries({ queryKey: queryKeys.session._def });

      router.replace("/");
    },
    onError: (error, variables) => {
      if (isAxiosError<{ message: string; email: string }>(error)) {
        if (error.response?.status === 429) {
          alert(
            "너무 잦은 로그인으로 카카오 로그인이 일시적으로 제한 되었습니다.\n잠시 후 다시 시도해주세요."
          );
          router.replace("/");
          return;
        }

        if (error.response?.status == 409) {
          const isLogin = confirm(
            "제대로 로그아웃 하지 않았거나\n이미 로그인중인 아이디입니다.\n현재 사용중인 브라우저에서 로그아웃 하겠습니까?"
          );
          if (isLogin) {
            const user = variables;

            // 세션 삭제 로직
            (async () => await destoryDBSession(user.id.toString()))();

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
    }
  });

  return { kakaoSigninMutate };
}
