import { useFormContext } from "react-hook-form";

export default function useSigninLoginBtn() {
  const { formState } = useFormContext();
  const errors = formState.errors["email"] || formState.errors["password"];
  const isDrity =
    formState.dirtyFields["email"] && formState.dirtyFields["password"];
  const isDisabled = !!errors || !isDrity;

  return { isDisabled };
}
