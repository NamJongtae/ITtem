import { useFormContext } from "react-hook-form";

export function useSignupProfileStatus() {
  const { formState } = useFormContext();
  const isDirty = formState.dirtyFields["nickname"];
  const errors = formState.errors["profileImg"] || formState.errors["nickname"];
  return { isDirty, errors };
}
