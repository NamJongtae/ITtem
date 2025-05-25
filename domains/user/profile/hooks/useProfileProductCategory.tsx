import { useCallback, useState } from "react";
import { ProductCategory } from "@/domains/product/shared/types/productTypes";

export default function useProfileProductCategory() {
  const [category, setCategory] = useState<ProductCategory>(
    ProductCategory.전체
  );

  const selectCategory = useCallback((category: ProductCategory) => {
    setCategory(category);
  }, []);

  return { category, selectCategory };
}
