import { ERROR_MESSAGE } from "@/constants/constant";
import { createAccount } from "@/lib/api/signup";
import { SignupResponseData, SignupRequsetData } from "@/types/apiTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function useSignupMutate() {
  const router = useRouter();

  const {
    mutateAsync: signupMutate,
    isPending: signupLoading,
    data,
  } = useMutation<
    AxiosResponse<SignupResponseData>,
    AxiosError,
    SignupRequsetData
  >({
    mutationFn: ({ email, password, profileImg, nickname, introduce }) =>
      createAccount({ email, password, profileImg, nickname, introduce }),
    onSuccess: (result) => {
      toast.success(result.data?.message);
      router.push("/");
    },
    onError: (error: unknown) => {
      if (isAxiosError<SignupResponseData, any>(error)) {
        if (error.response?.status === 500) {
          toast.warn(error.response?.data.message);
        } else {
          toast.warn(ERROR_MESSAGE);
        }
      }
    },
  });

  return { signupMutate, signupLoading, data };
}
