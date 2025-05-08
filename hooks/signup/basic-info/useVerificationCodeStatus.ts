import { useFormContext } from "react-hook-form";

export default function useVerificationCodeStatus() {
  const { formState } = useFormContext();

  const errors = formState.errors["verifyCode"];
  const isDirty = formState.dirtyFields["verifyCode"];

  return { errors, isDirty };
}
