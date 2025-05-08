import { VERIFIED_EMAIL_EXP } from "@/constants/constant";
import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction
} from "react";

interface VerificationEmailContextType {
  isSendToEmail: boolean;
  isVerificationEmail: boolean;
  sendToEmailLoading: boolean;
  sendToEmailError: boolean;
  timer: number;
  setIsSendToEmail: Dispatch<SetStateAction<boolean>>;
  setIsVerificationEmail: Dispatch<SetStateAction<boolean>>;
  setSendToEmailLoading: Dispatch<SetStateAction<boolean>>;
  setSendToEmailError: Dispatch<SetStateAction<boolean>>;
  setTimer: Dispatch<SetStateAction<number>>;
}

// 초기 context
export const VerificationEmailContext =
  createContext<VerificationEmailContextType>({
    isSendToEmail: false,
    isVerificationEmail: false,
    sendToEmailLoading: false,
    sendToEmailError: false,
    timer: VERIFIED_EMAIL_EXP,
    setIsSendToEmail: () => {},
    setIsVerificationEmail: () => {},
    setSendToEmailLoading: () => {},
    setSendToEmailError: () => {},
    setTimer: () => {}
  });

export function VerificationEmailContextProvider({
  children
}: {
  children: ReactNode;
}) {
  const [isSendToEmail, setIsSendToEmail] = useState(false);
  const [isVerificationEmail, setIsVerificationEmail] = useState(false);
  const [sendToEmailLoading, setSendToEmailLoading] = useState(false);
  const [sendToEmailError, setSendToEmailError] = useState(false);
  const [timer, setTimer] = useState(VERIFIED_EMAIL_EXP);

  return (
    <VerificationEmailContext.Provider
      value={{
        isSendToEmail,
        isVerificationEmail,
        sendToEmailLoading,
        sendToEmailError,
        timer,
        setIsSendToEmail,
        setIsVerificationEmail,
        setSendToEmailLoading,
        setSendToEmailError,
        setTimer
      }}
    >
      {children}
    </VerificationEmailContext.Provider>
  );
}
