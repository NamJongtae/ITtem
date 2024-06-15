import { useForm } from "react-hook-form";

interface IPrarms {
  name: string;
}

export default function useProductManageModal({ name }: IPrarms) {
  const textareaName = name + "Text";
  const { register, handleSubmit, watch, formState, control } = useForm({
    mode: "onChange",
    defaultValues: { [name]: "", [textareaName]: "" },
  });

  const selectValue = watch(name);

  const isDisabled =
    !formState.isDirty ||
    !!formState.errors[name] ||
    !!formState.errors[textareaName] ||
    !!(selectValue === "직접입력" && !formState.dirtyFields[textareaName]);

  return {
    register,
    handleSubmit,
    control,
    isDisabled,
    selectValue,
    textareaName,
  };
}
