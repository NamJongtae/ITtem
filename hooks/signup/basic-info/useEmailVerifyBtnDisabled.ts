import { useFormContext } from "react-hook-form";

export default function useEmailVerifyBtnDisabled() {
  const { formState } = useFormContext();
  const errors = formState.errors["verifyCode"];
  const isDirty = formState.dirtyFields["verifyCode"];
  const isDisabled = !!errors || !isDirty;

  return { isDisabled };
}
