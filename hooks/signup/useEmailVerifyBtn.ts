import { useFormContext } from "react-hook-form";

export default function useEmailVerifyBtn() {
  const { formState } = useFormContext();
  const error = formState.errors["verifyCode"];
  const isDirty = formState.dirtyFields["verifyCode"];
  const isDisabled = !!error || !isDirty;

  return { isDisabled };
}
