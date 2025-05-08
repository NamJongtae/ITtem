import { useFormContext } from "react-hook-form";
import useVerifyEmailMutate from "../../react-query/mutations/auth/useVerifyEmailMutate";
import { toast } from "react-toastify";
import { useCallback } from "react";

export default function useVerificationEmailHandler(isFindPw: boolean) {
  const { getValues } = useFormContext();

  const { verifyEmailMuate, verfiyEmailLoading } = useVerifyEmailMutate();

  const handleClickVerifyEmail = useCallback(async () => {
    const email = getValues("email");
    const verifyCode = getValues("verifyCode");
    if (!verifyCode) {
      toast.warn("인증번호를 입력해주세요.");
      return;
    }

    verifyEmailMuate({ email, verifyCode, isFindPw });
  }, [getValues, isFindPw, verifyEmailMuate]);

  return { verfiyEmailLoading, handleClickVerifyEmail };
}
