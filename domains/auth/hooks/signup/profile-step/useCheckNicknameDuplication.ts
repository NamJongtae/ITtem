import useNicknameDuplicationMutate from "../../mutations/useNicknameDuplicationMutate";
import { NicknameDuplicationResponseData } from "../../../types/response-types";
import { isAxiosError } from "axios";
import { useFormContext } from "react-hook-form";

interface IPrarms {
  nextStepHandler: () => void;
}

export default function useCheckNicknameDuplication({
  nextStepHandler
}: IPrarms) {
  const { setError, getValues } = useFormContext();
  const { nicknameDuplicationMutate } = useNicknameDuplicationMutate();
  const checkNicknameDuplication = async () => {
    try {
      const nickname = getValues("nickname");
      await nicknameDuplicationMutate(nickname);
    } catch (error) {
      if (isAxiosError<NicknameDuplicationResponseData>(error)) {
        if (error.response?.status === 401) {
          setError("nickname", {
            type: "duplication",
            message: "이미 사용중인 닉네임입니다."
          });
        }
      }
      return;
    }
    nextStepHandler();
  };

  return { checkNicknameDuplication };
}
