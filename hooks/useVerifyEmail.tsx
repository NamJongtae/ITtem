import { useEffect, useRef, useState } from "react";
import useVerifyEmailMutate from "./querys/useVerifyEmailMutate";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

export default function useVerifyEmail(isSendToVerifyEmail: boolean) {
  const { getValues } = useFormContext();
  const [verifiedEmail, setVerfiedEmail] = useState(false);
  const verifyNumberRef = useRef<HTMLInputElement | null>(null);

  const successVeriedEmail = () => {
    setVerfiedEmail(true);
  };

  const { verifyEmailMuate } = useVerifyEmailMutate(successVeriedEmail);

  const handleClickVerifyEmail = async () => {
    const email = getValues("email");
    const verifyNumber = parseInt(getValues("verifyNumber"), 10);
    if (!verifyNumber) {
      toast.warn("인증번호를 입력해주세요.");
      return;
    }

    verifyEmailMuate({ email, verifyNumber });
  };
  

  useEffect(() => {
    if (!verifyNumberRef.current) return;
    verifyNumberRef.current.focus();
  }, [isSendToVerifyEmail, verifyNumberRef]);

  return { verifiedEmail, handleClickVerifyEmail, verifyNumberRef };
}
