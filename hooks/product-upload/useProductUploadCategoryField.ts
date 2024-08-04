import { ProductCategory } from "@/types/product-types";
import { useFormContext } from "react-hook-form";

export default function useProductUploadCategoryField() {
  const { register, setValue, watch } = useFormContext();
  const currentCategory = watch("category");

  const handleClickCategory = (category: ProductCategory) => {
    setValue("category", category, { shouldDirty: true });
  };

  return { register, currentCategory, handleClickCategory };
}
