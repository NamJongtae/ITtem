import { ERROR_MESSAGE } from "@/shared/common/constants/constant";
import checkNicknameDuplication from "../../api/checkNicknameDuplication";
import { NicknameDuplicationResponseData } from "../../types/responseTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function useNicknameDuplicationMutate() {
  const { mutateAsync: nicknameDuplicationMutate } = useMutation<
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
    }
  });

  return { nicknameDuplicationMutate };
}
