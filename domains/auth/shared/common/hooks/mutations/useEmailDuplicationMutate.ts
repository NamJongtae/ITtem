import { ERROR_MESSAGE } from "@/shared/common/constants/constant";
import checkEmailDuplication from "../../api/checkEmailDuplication";
import { EmailDuplicationResponseData } from "../../types/responseTypes";
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
    mutationFn: async (email: string) => await checkEmailDuplication(email),
    onError: (error: unknown) => {
      if (isAxiosError<EmailDuplicationResponseData>(error)) {
        if (error.response?.status === 409) {
          setError("email", {
            type: "duplication",
            message: "이미 사용중인 이메일이에요."
          });
        } else {
          toast.warn(ERROR_MESSAGE);
        }
      }
    }
  });

  return { emailDuplicationMuate };
}
