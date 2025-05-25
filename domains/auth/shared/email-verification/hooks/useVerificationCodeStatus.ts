import { useFormContext } from "react-hook-form";

export default function useVerificationCodeStatus() {
  const { formState } = useFormContext();

  const errors = formState.errors["verificationCode"];
  const isDirty = formState.dirtyFields["verificationCode"];

  return { errors, isDirty };
}
