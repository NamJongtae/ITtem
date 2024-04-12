import { signupSlice } from "@/store/signupSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useVerifyEmailCounter() {
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
  const counterRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  // 카운터 관리
  useEffect(() => {
    if (isSendToVerifyEmail || sendToVerifyEmailLoading) {
      counterRef.current = null;
      counterRef.current = setInterval(() => {
        if (counter <= 0 && counterRef.current) {
          clearInterval(counterRef.current);
        }
        dispatch(signupSlice.actions.decrementCounter());
      }, 1000);

      if (isVerifiedEmail || sendToVerifyEmailError) {
        clearInterval(counterRef.current);
      }

      return () => {
        if (counterRef.current) clearInterval(counterRef.current);
      };
    }
  }, [
    isSendToVerifyEmail,
    isVerifiedEmail,
    sendToVerifyEmailLoading,
    sendToVerifyEmailError,
  ]);

  // 이메일 전송시 카운터 초기화
  useEffect(() => {
    if (sendToVerifyEmailLoading) {
      dispatch(signupSlice.actions.resetCounter());
    }
  }, [sendToVerifyEmailLoading]);

  return { counter };
}
