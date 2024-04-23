import { googleSignin } from "@/lib/api/auth";
import { authSlice } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";
import {
  GoogleAuthInfoResponseData,
  SigninResponseData,
} from "@/types/apiTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function useGoogleSigninMutate() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { mutate: googleSigninMutate } = useMutation<
    AxiosResponse<SigninResponseData>,
    AxiosError,
    GoogleAuthInfoResponseData
  >({
    mutationFn: async (user: GoogleAuthInfoResponseData) =>
      await googleSignin(user),
    onSuccess: (response) => {
      dispatch(authSlice.actions.saveAuth(response.data.user));
      router.push("/");
    },
    onError: (error) => {
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn("로그인에 실패했어요.");
        router.push("/signin");
      }
    },
  });

  return { googleSigninMutate };
}
