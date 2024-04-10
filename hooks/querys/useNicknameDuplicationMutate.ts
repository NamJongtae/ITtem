import { ERROR_MESSAGE } from "@/constants/constant";
import { checkNicknameDuplication } from "@/lib/api/signup";
import { CheckNicknameDuplicationData } from "@/types/apiTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function useNicknameDuplicationMutate() {
  const { mutateAsync: nicknameDuplicationMuate } = useMutation<
    AxiosResponse<CheckNicknameDuplicationData>,
    AxiosError,
    string
  >({
    mutationFn: (nickname: string) => checkNicknameDuplication(nickname),
    onError: (error: unknown) => {
      if (isAxiosError<CheckNicknameDuplicationData>(error)) {
        if (error.response?.status !== 401) {
          toast.warn(ERROR_MESSAGE);
        }
      }
    },
  });

  return { nicknameDuplicationMuate };
}
