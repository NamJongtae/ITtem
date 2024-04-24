import { ERROR_MESSAGE } from "@/constants/constant";
import { checkEmailDuplication } from "@/lib/api/auth";
import { EmailDuplicationResponseData } from "@/types/apiTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

export default function useEmailDuplicationMutate() {
  const { setError } = useFormContext();
  const { mutateAsync: emailDuplicationMuate } = useMutation<
    AxiosResponse<EmailDuplicationResponseData>,
    AxiosError,
    string
  >({
    mutationFn: (email: string) => checkEmailDuplication(email),
    onError: (error: unknown) => {
      if (isAxiosError<EmailDuplicationResponseData>(error)) {
        if (error.response?.status === 401) {
          setError("email", {
            type: "duplication",
            message: "이미 사용중인 이메일이에요.",
          });
        } else {
          toast.warn(ERROR_MESSAGE);
        }
      }
    },
  });

  return { emailDuplicationMuate };
}
