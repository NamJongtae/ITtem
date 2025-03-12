import { signout } from "@/lib/api/auth";
import { queryKeys } from "@/query-keys/query-keys";
import useAuthStore from "@/store/auth-store";
import useChatStore from "@/store/chat-store";
import useNotificationStore from "@/store/notification-store";
import { SignoutResposeData } from "@/types/api-types";
import { AuthData } from "@/types/auth-types";
import { ProductData } from "@/types/product-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useSignoutMutate() {
  const router = useRouter();
  const authActions = useAuthStore((state) => state.actions);
  const chatActions = useChatStore((state) => state.actions);
  const notificationActions = useNotificationStore((state) => state.actions);
  const queryClient = useQueryClient();
  const authQueryKey = queryKeys.auth.info().queryKey;
  const myProfileQueryKey = queryKeys.profile.my.queryKey;

  const { mutate: signoutMutate } = useMutation<
    AxiosResponse<SignoutResposeData>,
    AxiosError,
    undefined,
    {
      previousAuth: AuthData | unknown;
      previousMyProfile: ProductData | unknown;
    }
  >({
    mutationFn: signout,
    onSuccess: (response) => {
      queryClient.removeQueries({ queryKey: authQueryKey });

      queryClient.removeQueries({ queryKey: myProfileQueryKey });

      queryClient.removeQueries({ queryKey: queryKeys.session._def });

      authActions.resetAuth();
      chatActions.resetChatState();

      notificationActions.resetUnreadCount();
      if (
        response.data.message === "카카오 계정은 별도의 로그아웃이 필요해요."
      ) {
        router.replace(
          `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&logout_redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}`
        );
      } else {
        router.replace("/");
        router.refresh(); // middleware 버그 해결을 위해 router refresh
      }
    },
    onError: (error: unknown) => {
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
      }
    }
  });

  return { signoutMutate };
}
