import { VERIFICATION_EMAIL_EXP } from "../constants/constansts";
import { EmailVerificationStatus } from "../types/auth-types";
import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction
} from "react";

interface EmailVerificationContextType {
  emailStatus: EmailVerificationStatus;
  isLoading: boolean;
  isError: boolean;
  timer: number;
  setEmailStatus: Dispatch<SetStateAction<EmailVerificationStatus>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsError: Dispatch<SetStateAction<boolean>>;
  countDown: () => void;
  resetTimer: () => void;
  reset: () => void;
  send: () => void;
}

export const EmailVerificationContext =
  createContext<EmailVerificationContextType>({
    emailStatus: "INITIAL",
    isLoading: false,
    isError: false,
    timer: VERIFICATION_EMAIL_EXP,
    setEmailStatus: () => {},
    setIsLoading: () => {},
    setIsError: () => {},
    countDown: () => {},
    resetTimer: () => {},
    reset: () => {},
    send: () => {}
  });

export function EmailVerificationContextProvider({
  children
}: {
  children: ReactNode;
}) {
  const [emailStatus, setEmailStatus] =
    useState<EmailVerificationStatus>("INITIAL");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [timer, setTimer] = useState(VERIFICATION_EMAIL_EXP);

  const countDown = () => {
    setTimer((prev) => prev - 1);
  };
  const resetTimer = () => {
    setTimer(VERIFICATION_EMAIL_EXP);
  };

  const reset = () => {
    setEmailStatus("INITIAL");
    setTimer(VERIFICATION_EMAIL_EXP);
    setIsLoading(false);
    setIsError(false);
  };

  const send = () => {
    resetTimer();
    setEmailStatus("SEND");
    setIsLoading(true);
    setIsError(false);
  };

  return (
    <EmailVerificationContext.Provider
      value={{
        emailStatus,
        isLoading,
        isError,
        timer,
        setEmailStatus,
        setIsLoading,
        setIsError,
        countDown,
        resetTimer,
        reset,
        send
      }}
    >
      {children}
    </EmailVerificationContext.Provider>
  );
}
