import { signout } from "@/lib/api/auth";
import useAuthStore from "@/store/auth-store";
import useChatStore from "@/store/chat-store";
import useNotificationStore from "@/store/notification-store";
import { SignoutResposeData } from "@/types/api-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useGlobalLoadingStore from "@/store/global-loging-store";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useSignoutMutate() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const globalLoadingActions = useGlobalLoadingStore((state) => state.actions);
  const authActions = useAuthStore((state) => state.actions);
  const chatActions = useChatStore((state) => state.actions);
  const notificationActions = useNotificationStore((state) => state.actions);
  const queryClient = useQueryClient();

  const { mutate: signoutMutate } = useMutation<
    AxiosResponse<SignoutResposeData>,
    AxiosError,
    void
  >({
    mutationFn: () => signout(user?.uid || ""),
    onMutate: () => {
      globalLoadingActions.startLoading();
    },
    onSuccess: (response) => {
      queryClient.clear();

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
      authActions.setIsLoading(false);
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
      }
    },
    onSettled: () => {
      globalLoadingActions.stopLoading();
    }
  });

  return { signoutMutate };
}
