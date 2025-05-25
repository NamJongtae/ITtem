import { useFormContext } from "react-hook-form";
import useEmailVerificationStatus from "@/domains/auth/shared/email-verification/hooks/useEmailVerificationStatus";

export default function useBasicInfoNextBtnDisabled() {
  const { formState } = useFormContext();
  const errors =
    formState.errors["email"] ||
    formState.errors["password"] ||
    formState.errors["verificationCode"];
  const isDirty =
    formState.dirtyFields["email"] &&
    formState.dirtyFields["password"] &&
    formState.dirtyFields["verificationCode"];

  const { isVerifiedEmail } = useEmailVerificationStatus();

  const isDisabled = !!errors || !isDirty || !isVerifiedEmail;

  return { isDisabled };
}
