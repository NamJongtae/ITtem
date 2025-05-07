import { useFormContext } from "react-hook-form";

export default function useProfileNextBtnDisabled() {
  const { formState } = useFormContext();
  const isDirty = formState.dirtyFields["nickname"];
  const errors = formState.errors["nickname"];
  const isDisabled = !!errors || !isDirty;

  return { isDisabled };
}
