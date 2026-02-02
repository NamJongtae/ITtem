import { useFormContext } from "react-hook-form";
import { EmailVerificationContext } from "../context/EmailVerificationProvider";
import { useContext } from "react";

export default function useResetVerificationEmail() {
  const { reset } = useContext(EmailVerificationContext);
  const { clearErrors } = useFormContext();
  const resetSendToVerificationEmail = () => {
    reset();
    clearErrors("verificationCode");
  };

  return { resetSendToVerificationEmail };
}
