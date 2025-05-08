import useVerificationEmailStore from '@/store/verification-email-store';
import { useFormContext } from "react-hook-form";

export default function useBasicInfoNextBtnDisabled() {
  const { formState } = useFormContext();
  const errors =
    formState.errors["email"] ||
    formState.errors["password"] ||
    formState.errors["verifyCode"];
  const isDirty =
    formState.dirtyFields["email"] &&
    formState.dirtyFields["password"] &&
    formState.dirtyFields["verifyCode"];

  const isVerifiedEmail = useVerificationEmailStore(
    (state) => state.isVerifiedEmail
  );

  const isDisabled = !!errors || !isDirty || !isVerifiedEmail;

  return { isDisabled };
}
