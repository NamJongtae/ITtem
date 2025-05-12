import { signout } from "@/lib/api/auth";
import useAuthStore from "@/store/auth-store";
import useGlobalLoadingStore from "@/store/global-loging-store";
import { SignoutResposeData } from "@/types/api-types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useSignoutMutate() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const globalLoadingActions = useGlobalLoadingStore((state) => state.actions);

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
      if (
        response.data.message === "카카오 계정은 별도의 로그아웃이 필요해요."
      ) {
        router.replace(
          `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&logout_redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}/logout`
        );
      } else {
        router.replace("/logout");
      }
    },
    onError: (error: unknown) => {
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
