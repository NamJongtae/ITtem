import { useFormContext } from "react-hook-form";

export default function useCheckDisabledBtn() {
  const { formState } = useFormContext();

  const isDirty =
    formState.dirtyFields["current-password"] &&
    formState.dirtyFields["password"] &&
    formState.dirtyFields["password-check"];

  const isErrors =
    formState.errors["current-password"] ||
    formState.errors["password"] ||
    formState.errors["password-check"];

  const isDisabled = !isDirty || !!isErrors;

  return { isDisabled };
}
