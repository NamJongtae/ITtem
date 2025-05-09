import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function useReviewModalTags() {
  const { register, unregister, setValue, watch } = useFormContext();
  const tags = watch("tags");

  const handleCheckboxChange = (index: number) => {
    const updatedTags = [...tags];
    updatedTags[index] = updatedTags[index] === 0 ? 1 : 0;
    setValue("tags", updatedTags, { shouldDirty: true, shouldValidate: true });
  };

  useEffect(() => {
    register("tags");
    return () => unregister("tags");
  }, [register, unregister]);

  return { tags, handleCheckboxChange };
}
