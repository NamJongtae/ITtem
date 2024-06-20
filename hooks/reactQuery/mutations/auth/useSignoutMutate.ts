import { signout } from "@/lib/api/auth";
import { queryKeys } from "@/queryKeys";
import { authSlice } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";
import { SignoutResposeData } from "@/types/apiTypes";
import { AuthData } from "@/types/authTypes";
import { ProductData } from "@/types/productTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function useSignoutMutate() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const authQueryKey = queryKeys.auth.info().queryKey;
  const myProfileQueryKey = queryKeys.profile.my.queryKey;
  const sessionQueryKey = queryKeys.session.isExist.queryKey;

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

      queryClient.removeQueries({ queryKey: sessionQueryKey });

      dispatch(authSlice.actions.resetAuth());
      if (
        response.data.message === "카카오 계정은 별도의 로그아웃이 필요해요."
      ) {
        router.replace(
          `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&logout_redirect_uri=http://localhost:3000/signin`
        );
      } else {
        router.replace("/signin");
      }
    },
    onError: (error: unknown) => {
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
      }
    },
  });

  return { signoutMutate };
}
