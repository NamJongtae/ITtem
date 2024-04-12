import { sendToVerifyEmail } from "@/lib/api/signup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { VerifyEmailResponseData } from "@/types/apiTypes";
import { ERROR_MESSAGE } from "@/constants/constant";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { signupSlice } from "@/store/signupSlice";

export default function useSendToVerifyEmailMutate() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    mutate: sendToVerifyEmailMutate
  } = useMutation<AxiosResponse<VerifyEmailResponseData>, AxiosError, string>({
    mutationFn: (email: string) => sendToVerifyEmail(email),
    onSuccess: (result) => {
      toast.success(result.data?.message);
      dispatch(signupSlice.actions.setSendToVerifyEmailLoading(false));
      dispatch(signupSlice.actions.setSendToVerifyEmailError(false));
    },
    onError: (error: unknown) => {
      dispatch(signupSlice.actions.setSendToVerifyEmailLoading(false));
      if (isAxiosError<VerifyEmailResponseData, any>(error)) {
        dispatch(signupSlice.actions.inactiveCounter());
        dispatch(signupSlice.actions.setSendToVerifyEmailError(true));
        if (error.response?.status === 422) {
          toast.warn(error.response?.data.message);
        } else {
          toast.warn(ERROR_MESSAGE);
        }
      }
    },
  });

  return {
    sendToVerifyEmailMutate
  };
}
