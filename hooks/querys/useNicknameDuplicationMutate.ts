import { ERROR_MESSAGE } from "@/constants/constant";
import { checkNicknameDuplication } from "@/lib/api/signup";
import { NicknameDuplicationResponseData } from "@/types/apiTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function useNicknameDuplicationMutate() {
  const { mutateAsync: nicknameDuplicationMuate } = useMutation<
    AxiosResponse<NicknameDuplicationResponseData>,
    AxiosError,
    string
  >({
    mutationFn: (nickname: string) => checkNicknameDuplication(nickname),
    onError: (error: unknown) => {
      if (isAxiosError<NicknameDuplicationResponseData>(error)) {
        if (error.response?.status !== 401) {
          toast.warn(ERROR_MESSAGE);
        }
      }
    },
  });

  return { nicknameDuplicationMuate };
}
