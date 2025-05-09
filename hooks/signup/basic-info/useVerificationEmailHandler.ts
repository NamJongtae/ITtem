import { useFormContext } from "react-hook-form";
import useVerificationEmailMutate from "../../react-query/mutations/auth/useVerificationEmailMutate";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { VerificationEmailType } from "@/types/auth-types";

export default function useVerificationEmailHandler(
  type: VerificationEmailType
) {
  const { getValues } = useFormContext();

  const { verificationEmailMuate, verificationEmailLoading } =
    useVerificationEmailMutate();

  const handleClickVerificationEmail = useCallback(async () => {
    const email = getValues("email");
    const verificationCode = getValues("verificationCode");
    if (!verificationCode) {
      toast.warn("인증번호를 입력해주세요.");
      return;
    }

    verificationEmailMuate({ email, verificationCode, type });
  }, [getValues, type, verificationEmailMuate]);

  return { verificationEmailLoading, handleClickVerificationEmail };
}
