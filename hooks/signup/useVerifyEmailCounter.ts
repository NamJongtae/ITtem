import { signupSlice } from "@/store/signupSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function useVerifyEmailCounter() {
  const { setError } = useFormContext();
  const isSendToVerifyEmail = useSelector(
    (state: RootState) => state.signup.isSendToVerifyEmail
  );
  const isVerifiedEmail = useSelector(
    (state: RootState) => state.signup.isVerifedEmail
  );
  const sendToVerifyEmailLoading = useSelector(
    (state: RootState) => state.signup.sendToVerifyEmailLoading
  );
  const sendToVerifyEmailError = useSelector(
    (state: RootState) => state.signup.sendToVerifyEmailError
  );
  const counter = useSelector((state: RootState) => state.signup.counter);
  const counterRef = useRef(counter);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    counterRef.current = counter;
  }, [counter]);

  useEffect(() => {
    if (isSendToVerifyEmail) {
      intervalRef.current = setInterval(() => {
        if (counterRef.current <= 0) {
          if (!sendToVerifyEmailError) {
            toast.warn("인증 시간이 만료되었어요.");
            setError("verifyCode", {
              type: "validate",
              message: "인증 시간이 만료되었어요. 인증 재요청을 해주세요.",
            });
          }

          if (intervalRef.current) clearInterval(intervalRef.current);
        } else {
          dispatch(signupSlice.actions.decrementCounter());
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
    sendToVerifyEmailLoading,
  ]);

  return { counter };
}
