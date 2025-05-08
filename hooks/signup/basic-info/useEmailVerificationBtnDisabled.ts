import { useFormContext } from "react-hook-form";

export default function useEmailVerificationBtnDisabled() {
  const { formState } = useFormContext();
  const errors = formState.errors["verificationCode"];
  const isDirty = formState.dirtyFields["verificationCode"];
  const isDisabled = !!errors || !isDirty;

  return { isDisabled };
}
