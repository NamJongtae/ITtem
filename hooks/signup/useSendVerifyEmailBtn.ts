import { useFormContext } from "react-hook-form";

export default function useSendVerifyEmailBtn() {
  const { formState } = useFormContext();
  const error = formState.errors["email"];
  const isDirty = formState.dirtyFields["email"];
  const isDisabled = !!error || !isDirty;

  return { isDisabled };
}
