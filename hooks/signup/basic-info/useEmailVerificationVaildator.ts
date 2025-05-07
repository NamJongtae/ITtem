import { useFormContext } from 'react-hook-form';
import useCheckEmailMutate from '@/hooks/react-query/mutations/auth/useCheckEmailMutate';
import useEmailDuplicationMutate from '@/hooks/react-query/mutations/auth/useEmailDuplicationMutate';
import { toast } from 'react-toastify';

export function useEmailVerificationValidator(isFindPw: boolean) {
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
      if (isFindPw) {
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
