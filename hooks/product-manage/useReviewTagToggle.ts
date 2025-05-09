import { useFormContext } from "react-hook-form";

export default function useReviewTagToggle() {
  const { setValue, watch } = useFormContext();
  const tags = watch("tags");

  const onChangeCheckbox = (index: number) => {
    const updatedTags = [...tags];
    updatedTags[index] = updatedTags[index] === 0 ? 1 : 0;
    setValue("tags", updatedTags, { shouldDirty: true, shouldValidate: true });
  };

  return { tags, onChangeCheckbox };
}
