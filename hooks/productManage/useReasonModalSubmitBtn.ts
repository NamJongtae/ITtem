import { useFormContext } from "react-hook-form";

interface IParams {
  name: string;
}

export default function useReasonModalSubmitBtn({ name }: IParams) {
  const { formState, watch } = useFormContext();
  const selectValue = watch(name);

  const isDisabled =
    !formState.isDirty ||
    !!formState.errors[name] ||
    !!formState.errors[`textarea${name}`] ||
    !!(selectValue === "직접입력" && !formState.dirtyFields[`textarea${name}`]);

  return { isDisabled };
}
