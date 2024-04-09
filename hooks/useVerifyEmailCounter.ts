import { useEffect, useRef, useState } from "react";

export default function useVerifyEmailCounter(
  isSendToVerifyEmail: boolean,
  verifiedEmail: boolean,
  sendToVerifyEmailError: boolean,
  SendToVerifyEmailLoading: boolean
) {
  const [counter, setCounter] = useState(180);
  const counterRef = useRef<NodeJS.Timeout | null>(null);
  
  const resetCounter = () => {
    setCounter(180);
  };

  const inactiveCounter = () => {
    setCounter(0);
  };

  // 카운터 관리
  useEffect(() => {
    if (isSendToVerifyEmail) {
      counterRef.current = null;
      counterRef.current = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter <= 0 && counterRef.current) {
            clearInterval(counterRef.current);
            return 0;
          }
          return prevCounter - 1;
        });
      }, 1000);

      if (verifiedEmail) {
        clearInterval(counterRef.current);
      }

      return () => {
        if (counterRef.current) clearInterval(counterRef.current);
      };
    }
  }, [isSendToVerifyEmail, verifiedEmail, SendToVerifyEmailLoading]);

  useEffect(() => {
    if (sendToVerifyEmailError) {
      inactiveCounter();
    }
  }, [sendToVerifyEmailError]);

  // 이메일 전송시 카운터 초기화
  useEffect(()=>{
    if(SendToVerifyEmailLoading){
      resetCounter();
    }
  },[SendToVerifyEmailLoading])

  return { counter, resetCounter, inactiveCounter };
}
