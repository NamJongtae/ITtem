import { NicknameDuplicationResponseData } from "@/domains/auth/types/response-types";
import { isAxiosError } from "axios";
import { useFormContext } from "react-hook-form";
import useNicknameDuplicationMutate from "@/domains/auth/hooks/mutations/useNicknameDuplicationMutate";

export default function useProfileEditNicknameField() {
  const { setError, formState } = useFormContext();
  const { nicknameDuplicationMutate } = useNicknameDuplicationMutate();

  const validateNicknameOnBlur = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      if (formState.defaultValues?.nickname === e.target.value) return;
      await nicknameDuplicationMutate(e.target.value);
    } catch (error) {
      if (isAxiosError<NicknameDuplicationResponseData>(error)) {
        if (error.response?.status === 401) {
          setError("nickname", {
            type: "validate",
            message: "중복된 닉네임이에요."
          });
        }
      }
    }
  };

  return { validateNicknameOnBlur };
}
