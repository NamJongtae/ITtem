import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import useVerificationEmailStore from "@/store/verification-email-store";

export default function useResetInputOnTimerEnd() {
  const { timer } = useVerificationEmailStore();
  const { setValue } = useFormContext();

  useEffect(() => {
    if (timer <= 0) {
      setValue("verificationCode", "");
    }
  }, [timer, setValue]);

  return { timer };
}
