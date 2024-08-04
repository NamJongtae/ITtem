import { ERROR_MESSAGE } from "@/constants/constant";
import { createAccount } from "@/lib/api/auth";
import { SignupResponseData } from "@/types/apiTypes";
import { SignupData } from "@/types/authTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useSignupMutate() {
  const router = useRouter();

  const {
    mutate: signupMutate,
    isPending: signupLoading,
    data,
  } = useMutation<AxiosResponse<SignupResponseData>, AxiosError, SignupData>({
    mutationFn: ({ email, password, profileImgFile, nickname, introduce }) =>
      createAccount({
        email,
        password,
        profileImgFile,
        nickname,
        introduce,
      }),
    onSuccess: (result) => {
      toast.success(result.data?.message);
      router.push("/");
    },
    onError: (error: unknown) => {
      if (isAxiosError<SignupResponseData, any>(error)) {
        if (error.response?.status === 422 || error.response?.status === 500) {
          toast.warn(error.response?.data.message);
        } else {
          toast.warn(ERROR_MESSAGE);
        }
      }
    },
  });

  return { signupMutate, signupLoading, data };
}
