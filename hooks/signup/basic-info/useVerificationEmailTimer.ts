import useSignupStore from "@/store/signup-store";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

export default function useVerificationEmailTimer() {
  const { setError } = useFormContext();
  const timer = useSignupStore((state) => state.timer);
  const isSendToVerifyEmail = useSignupStore(
    (state) => state.isSendToVerifyEmail
  );
  const isVerifiedEmail = useSignupStore((state) => state.isVerifiedEmail);
  const sendToVerifyEmailLoading = useSignupStore(
    (state) => state.sendToVerifyEmailLoading
  );
  const sendToVerifyEmailError = useSignupStore(
    (state) => state.sendToVerifyEmailError
  );
  const actions = useSignupStore((state) => state.actions);
  const counterRef = useRef(timer);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    counterRef.current = timer;
  }, [timer]);

  useEffect(() => {
    if (isSendToVerifyEmail) {
      intervalRef.current = setInterval(() => {
        if (counterRef.current <= 0) {
          if (!sendToVerifyEmailError) {
            toast.warn("인증 시간이 만료되었어요.");
            setError("verifyCode", {
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

    if (isVerifiedEmail || sendToVerifyEmailError) {
      clearInterval(counterRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [
    isSendToVerifyEmail,
    isVerifiedEmail,
    sendToVerifyEmailError,
    sendToVerifyEmailLoading
  ]);

  return { timer };
}
