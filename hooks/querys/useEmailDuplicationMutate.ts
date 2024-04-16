import { ERROR_MESSAGE } from "@/constants/constant";
import { checkEmailDuplication } from "@/lib/api/signup";
import { EmailDuplicationResponseData } from "@/types/apiTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function useEmailDuplicationMutate() {
  const { mutateAsync: emailDuplicationMuate } = useMutation<
    AxiosResponse<EmailDuplicationResponseData>,
    AxiosError,
    string
  >({
    mutationFn: (email: string) => checkEmailDuplication(email),
    onError: (error: unknown) => {
      if (isAxiosError<EmailDuplicationResponseData>(error)) {
        if (error.response?.status !== 401) {
          toast.warn(ERROR_MESSAGE);
        }
      }
    },
  });

  return { emailDuplicationMuate };
}