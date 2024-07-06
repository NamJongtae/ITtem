import { NicknameDuplicationResponseData } from "@/types/apiTypes";
import { isAxiosError } from "axios";
import { useFormContext } from "react-hook-form";
import useNicknameDuplicationMutate from "../reactQuery/mutations/auth/useNicknameDuplicationMutate";

export default function useProfileEditNicknameField() {
  const { setError, formState } = useFormContext();
  const { nicknameDuplicationMuate } = useNicknameDuplicationMutate();
  
  const handleBlur = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (formState.defaultValues?.nickname === e.target.value) return;
      await nicknameDuplicationMuate(e.target.value);
    } catch (error) {
      if (isAxiosError<NicknameDuplicationResponseData>(error)) {
        if (error.response?.status === 401) {
          setError("nickname", {
            type: "validate",
            message: "중복된 닉네임이에요.",
          });
        }
      }
    }
  };

  return { handleBlur };
}
