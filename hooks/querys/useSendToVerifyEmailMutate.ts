import { sendToVerifyEmail } from "@/lib/api/signup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { EmailVerifyData } from "@/types/apiTypes";
import { ERROR_MESSAGE } from '@/constants/constant';

export default function useSendToVerifyEmailMutate() {
  const {
    mutate: sendToVerifyEmailMutate,
    isPending: SendToVerifyEmailLoading,
    isError: sendToVerifyEmailError,
  } = useMutation<AxiosResponse<EmailVerifyData>, AxiosError, string>({
    mutationFn: (email: string) => sendToVerifyEmail(email),
    onSuccess: (result) => {
      toast.success(result.data?.message);
    },
    onError: (error: unknown) => {
      if (isAxiosError<EmailVerifyData, any>(error)) {
        if(error.response?.status === 422){
          toast.warn(error.response?.data.message);
        } else {
          toast.warn(ERROR_MESSAGE);
        }
       
      }
    },
  });

  return {
    sendToVerifyEmailMutate,
    SendToVerifyEmailLoading,
    sendToVerifyEmailError,
  };
}
