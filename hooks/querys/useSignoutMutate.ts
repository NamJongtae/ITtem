import { AUTH_QUERY_KEY } from "@/constants/constant";
import { signout } from "@/lib/api/auth";
import { authSlice } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";
import { AuthData, SignoutResposeData } from "@/types/apiTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function useSignoutMutate() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();

  const { mutate: signoutMutate } = useMutation<
    AxiosResponse<SignoutResposeData>,
    AxiosError,
    undefined,
    { previousAuth: AuthData | unknown }
  >({
    mutationFn: signout,
    onMutate: () => {
      const previousAuth: AuthData | unknown = queryClient.getQueriesData({
        queryKey: AUTH_QUERY_KEY,
      });
      dispatch(authSlice.actions.resetAuth());
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEY });

      return { previousAuth };
    },
    onSuccess: (response) => {
      if (
        response.data.message === "카카오 계정은 별도의 로그아웃이 필요해요."
      ) {
        router.push(
          `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&logout_redirect_uri=http://localhost:3000/signin`
        );
      } else {
        router.push("/signin");
      }
    },
    onError: (error: unknown, _, context) => {
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
      }
      if (context?.previousAuth) {
        queryClient.setQueryData(AUTH_QUERY_KEY, context.previousAuth);
        dispatch(authSlice.actions.saveAuth(context.previousAuth as AuthData));
      }
    },
  });

  return { signoutMutate };
}
