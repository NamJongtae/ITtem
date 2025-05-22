import { EmailVerificationContext } from "../../store/EmailVerificationProvider";
import { useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

export default function useVerificationTimer() {
  const { timer, countDown } = useContext(EmailVerificationContext);
  const { setError } = useFormContext();
  const { emailStatus, isError } = useContext(EmailVerificationContext);
  const { setValue } = useFormContext();

  useEffect(() => {
    if (timer <= 0 && emailStatus === "SEND") {
      if (!isError) {
        toast.warn("인증 시간이 만료되었어요.");
        setError("verificationCode", {
          type: "validate",
          message: "인증 시간이 만료되었어요. 인증 재요청을 해주세요."
        });
      }
    }
  }, [timer, emailStatus, isError, setError]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (emailStatus === "SEND" && timer > 0) {
      timeout = setTimeout(() => {
        countDown();
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [timer, emailStatus, countDown]);

  useEffect(() => {
    if (timer <= 0) {
      setValue("verificationCode", "");
    }
  }, [timer, setValue]);

  return { timer };
}
