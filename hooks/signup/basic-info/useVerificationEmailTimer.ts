import useVerificationEmailStore from "@/store/verification-email-store";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

export default function useVerificationEmailTimer() {
  const { setError } = useFormContext();
  const timer = useVerificationEmailStore((state) => state.timer);
  const isSendToVerificationEmail = useVerificationEmailStore(
    (state) => state.isSendToVerificationEmail
  );
  const isVerifiedEmail = useVerificationEmailStore(
    (state) => state.isVerifiedEmail
  );
  const sendToVerificationEmailLoading = useVerificationEmailStore(
    (state) => state.sendToVerificationEmailLoading
  );
  const sendToVerificationEmailError = useVerificationEmailStore(
    (state) => state.sendToVerificationEmailError
  );
  const actions = useVerificationEmailStore((state) => state.actions);
  const counterRef = useRef(timer);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    counterRef.current = timer;
  }, [timer]);

  useEffect(() => {
    if (isSendToVerificationEmail) {
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        if (counterRef.current <= 0) {
          if (!sendToVerificationEmailError) {
            toast.warn("인증 시간이 만료되었어요.");
            setError("verificationCode", {
              type: "validate",
              message: "인증 시간이 만료되었어요. 인증 재요청을 해주세요."
            });
          }

          if (intervalRef.current) clearInterval(intervalRef.current);
        } else {
          actions.decrementTimer();
          counterRef.current -= 1;
        }
      }, 1000);
    }

    if (isVerifiedEmail || isSendToVerificationEmail) {
      clearInterval(counterRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [
    actions,
    isSendToVerificationEmail,
    isVerifiedEmail,
    sendToVerificationEmailError,
    sendToVerificationEmailLoading,
    setError
  ]);

  return { timer };
}
