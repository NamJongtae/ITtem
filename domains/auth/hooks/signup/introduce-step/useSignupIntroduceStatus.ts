import { useFormContext } from "react-hook-form";

export function useSignupIntroduceStatus() {
  const { formState } = useFormContext();
  const errors = formState.errors["introduce"];
  return { errors };
}
