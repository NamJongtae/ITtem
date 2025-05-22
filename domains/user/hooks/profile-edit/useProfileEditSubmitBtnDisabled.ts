import { useFormContext } from "react-hook-form";

export default function useProfileEditSubmitBtnDisabled() {
  const { formState } = useFormContext();

  const isDirty = formState.isDirty;
  const isError =
    formState.errors["nickname"] ||
    formState.errors["profileImg"] ||
    formState.errors["introduce"];

  const isDisabled = !isDirty || !!isError;

  return { isDisabled };
}
