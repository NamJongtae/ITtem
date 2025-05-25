import { useFormContext } from "react-hook-form";
import useCheckEmailMutate from "../../common/hooks/mutations/useCheckEmailMutate";
import useEmailDuplicationMutate from "../../common/hooks/mutations/useEmailDuplicationMutate";
import { toast } from "react-toastify";
import { EmailVerificationType } from "../types/emailVerificationTypes";

export function useEmailVerificationValidator(type: EmailVerificationType) {
  const { getValues } = useFormContext();
  const { checkEmailMutate } = useCheckEmailMutate();
  const { emailDuplicationMuate } = useEmailDuplicationMutate();

  const validate = async () => {
    const email = getValues("email");
    if (!email) {
      toast.warn("이메일을 입력해주세요.");
      return false;
    }

    try {
      if (type === "resetPw") {
        await checkEmailMutate(email);
      } else {
        await emailDuplicationMuate(email);
      }
      return true;
    } catch {
      return false;
    }
  };

  return { validate };
}
