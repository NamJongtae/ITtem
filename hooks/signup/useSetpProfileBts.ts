import { useFormContext } from "react-hook-form";
import useNicknameDuplicationMutate from "../reactQuery/mutations/auth/useNicknameDuplicationMutate";
import { NicknameDuplicationResponseData } from "@/types/apiTypes";
import { isAxiosError } from "axios";

interface IPrarms {
  nextStepHandler: () => void;
}

export default function useSetpProfileBts({ nextStepHandler }: IPrarms) {
  const { formState, setError, getValues } = useFormContext();
  const isDirty = formState.dirtyFields["nickname"];
  const errors = formState.errors["nickname"];
  const isDisabled = !!errors || !isDirty;
  const { nicknameDuplicationMuate } = useNicknameDuplicationMutate();
  const handleBlurNickname = async () => {
    try {
      const nickname = getValues("nickname");
      await nicknameDuplicationMuate(nickname);
    } catch (error) {
      if (isAxiosError<NicknameDuplicationResponseData>(error)) {
        if (error.response?.status === 401) {
          setError("nickname", {
            type: "duplication",
            message: "이미 사용중인 닉네임입니다.",
          });
        }
      }
      return;
    }
    nextStepHandler();
  };

  return { isDisabled, handleBlurNickname };
}