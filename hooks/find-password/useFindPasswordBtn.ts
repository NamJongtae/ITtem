import useVerificationEmailStore from "@/store/verification-email-store";
import { useFormContext } from "react-hook-form";

export default function useFindPasswordDisabled() {
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

  const isVerifiedEmail = useVerificationEmailStore(
    (state) => state.isVerifiedEmail
  );
  const isDisabled = !!errors || !isDirty || !isVerifiedEmail;

  return { isDisabled };
}
