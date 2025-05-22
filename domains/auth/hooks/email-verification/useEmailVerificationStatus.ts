import { EmailVerificationContext } from '../../store/EmailVerificationProvider';
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

export default function useEmailVerificationStatus() {
  const { formState } = useFormContext();

  const { emailStatus } = useContext(EmailVerificationContext);
  const isDirty = formState.dirtyFields["email"];
  const errors = formState.errors["email"];

  return {
    isSendToVerificationEmail: emailStatus === "SEND",
    isVerifiedEmail: emailStatus === "VERFICATION",
    errors,
    isDirty
  };
}
