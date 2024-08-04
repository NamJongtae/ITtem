import { sendToVerifyEmail } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { VerifyEmailResponseData } from "@/types/api-types";
import { ERROR_MESSAGE } from "@/constants/constant";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { signupSlice } from "@/store/slice/signup-slice";
import { useFormContext } from "react-hook-form";

export default function useSendToVerifyEmailMutate() {
  const dispatch = useDispatch<AppDispatch>();
  const { setError } = useFormContext();
  const { mutate: sendToVerifyEmailMutate } = useMutation<
    AxiosResponse<VerifyEmailResponseData>,
    AxiosError,
    { email: string; isFindPw?: boolean }
  >({
    mutationFn: ({ email, isFindPw }) => sendToVerifyEmail(email, isFindPw),
    onSuccess: (result) => {
      toast.success(result.data?.message);
      dispatch(signupSlice.actions.setSendToVerifyEmailLoading(false));
      dispatch(signupSlice.actions.setSendToVerifyEmailError(false));
    },
    onError: (error: unknown) => {
      dispatch(signupSlice.actions.inactiveCounter());
      dispatch(signupSlice.actions.setSendToVerifyEmailLoading(false));
      if (isAxiosError<VerifyEmailResponseData, any>(error)) {
        dispatch(signupSlice.actions.setSendToVerifyEmailError(true));
        if (error.response?.status === 403) {
          dispatch(signupSlice.actions.resetSendToVerifyEmail());
          toast.warn(error.response?.data.message);
          setError("verifyCode", {
            type: "validate",
            message: "일일 시도 횟수를 초과했어요.",
          });
        } else {
          toast.warn(ERROR_MESSAGE);
        }
      }
    },
  });

  return {
    sendToVerifyEmailMutate,
  };
}
