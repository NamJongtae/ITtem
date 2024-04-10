import useNicknameDuplicationMutate from "@/hooks/querys/useNicknameDuplicationMutate";
import { CheckNicknameDuplicationData } from "@/types/apiTypes";
import { isAxiosError } from "axios";
import { useFormContext } from "react-hook-form";

interface IProps {
  nextStepHandler: () => void;
}

export default function SetpProfileBtns({ nextStepHandler }: IProps) {
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
      if (isAxiosError<CheckNicknameDuplicationData>(error)) {
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

  return (
    <div className="w-full flex flex-col gap-3 absolute bottom-10">
      <button
        type="button"
        onClick={handleBlurNickname}
        className="button_primary disabled:opacity-50"
        disabled={isDisabled}
      >
        다음
      </button>
    </div>
  );
}
