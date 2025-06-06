import { EmailVerificationContext } from "../context/EmailVerificationProvider";
import { useContext } from "react";

export default function useResetVerificationEmail() {
  const { setEmailStatus } = useContext(EmailVerificationContext);

  const resetSendToVerificationEmail = () => {
    setEmailStatus("INITIAL");
  };

  return { resetSendToVerificationEmail };
}
