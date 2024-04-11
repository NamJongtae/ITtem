import { useEffect, useRef, useState } from "react";
import useVerifyEmailMutate from "./querys/useVerifyEmailMutate";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

export default function useVerifyEmail(isSendToVerifyEmail: boolean) {
  const { getValues } = useFormContext();
  const [verifiedEmail, setVerfiedEmail] = useState(false);
  const verifyCodeRef = useRef<HTMLInputElement | null>(null);

  const successVeriedEmail = () => {
    setVerfiedEmail(true);
  };

  const { verifyEmailMuate } = useVerifyEmailMutate(successVeriedEmail);

  const handleClickVerifyEmail = async () => {
    const email = getValues("email");
    const verifyCode = getValues("verifyCode");
    if (!verifyCode) {
      toast.warn("인증번호를 입력해주세요.");
      return;
    }

    verifyEmailMuate({ email, verifyCode });
  };

  useEffect(() => {
    if (!verifyCodeRef.current) return;
    verifyCodeRef.current.focus();
  }, [isSendToVerifyEmail, verifyCodeRef]);

  return {
    verifiedEmail,
    handleClickVerifyEmail,
    verifyCodeRef,
  };
}
