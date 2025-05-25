import { useFormContext } from "react-hook-form";

export function useSignupBasictInfoStatus() {
  const { formState } = useFormContext();
  const isDirty = formState.dirtyFields["email"] && formState.dirtyFields["password"];
  const errors = formState.errors["email"] || formState.errors["password"];
  return { isDirty, errors };
}
