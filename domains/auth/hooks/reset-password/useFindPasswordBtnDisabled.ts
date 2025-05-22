import { useFormContext } from "react-hook-form";
import useEmailVerificationStatus from "../email-verification/useEmailVerificationStatus";

export default function useFindPasswordBtnDisabled() {
  const { formState } = useFormContext();
  const errors =
    formState.errors["email"] ||
    formState.errors["password"] ||
    formState.errors["password-check"] ||
    formState.errors["verificationCode"];
  const isDirty =
    formState.dirtyFields["email"] &&
    formState.dirtyFields["password"] &&
    formState.dirtyFields["password-check"] &&
    formState.dirtyFields["verificationCode"];

  const { isVerifiedEmail } = useEmailVerificationStatus();
  const isDisabled = !!errors || !isDirty || !isVerifiedEmail;

  return { isDisabled };
}
