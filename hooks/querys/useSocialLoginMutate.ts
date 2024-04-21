import { SocialLogin } from "@/lib/api/auth";
import { authSlice } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";
import { SigninResponseData, SocialType } from "@/types/apiTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function useSocialLoginMutate() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const {
    mutate: socialLoginMutate,
    data: socialLoginData,
    error: socialLoginError,
    isPending: socialLoginLoading,
  } = useMutation<
    AxiosResponse<SigninResponseData>,
    AxiosError,
    {
      socialType: SocialType;
      accessToken: string;
    }
  >({
    mutationFn: ({
      socialType,
      accessToken,
    }: {
      socialType: SocialType;
      accessToken: string;
    }) => SocialLogin(socialType, accessToken),
    onSuccess: (response) => {
      dispatch(authSlice.actions.saveAuth(response.data.user));
      router.push("/");
    },
    onError: (error) => {
      if (isAxiosError<{ message: string }>(error)) {
        if (error.response?.status === 401) {
          toast.warn(error.response.data.message);
        }
      }
    },
  });

  return {
    socialLoginMutate,
    socialLoginData,
    socialLoginError,
    socialLoginLoading,
  };
}
