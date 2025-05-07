import { useFormContext } from "react-hook-form";

export default function useSendVerifyEmailBtnDisabled() {
  const { formState } = useFormContext();
  const errors = formState.errors["email"];
  const isDirty = formState.dirtyFields["email"];
  const isDisabled = !!errors || !isDirty;

  return { isDisabled };
}
