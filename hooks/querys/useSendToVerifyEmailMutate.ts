import { sendToVerifyEmail } from "@/lib/api/signup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export default function useSendToVerifyEmailMutate() {
  const {
    mutate: sendToVerifyEmailMutate,
    isPending: SendToVerifyEmailLoading,
    isError: sendToVerifyEmailError,
  } = useMutation({
    mutationFn: (email: string) => sendToVerifyEmail(email),
    onSuccess: (result) => {
      toast.success(result.data?.message);
    },
    onError: (error: unknown) => {
      if (isAxiosError<EmailVerifyData, any>(error)) {
        toast.warn(error.response?.data.message);
      }
    },
  });

  return {
    sendToVerifyEmailMutate,
    SendToVerifyEmailLoading,
    sendToVerifyEmailError,
  };
}
