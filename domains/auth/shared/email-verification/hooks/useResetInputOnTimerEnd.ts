import { useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { EmailVerificationContext } from "../context/EmailVerificationProvider";

export default function useResetInputOnTimerEnd() {
  const { timer } = useContext(EmailVerificationContext);
  const { setValue } = useFormContext();

  useEffect(() => {
    if (timer <= 0) {
      setValue("verificationCode", "");
    }
  }, [timer, setValue]);

  return { timer };
}
