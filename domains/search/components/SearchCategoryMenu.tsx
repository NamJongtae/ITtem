"use client";

import useSerachCategory from "../hooks/useSerachCategory";
import CategoryMenuUI from "@/shared/category/components/CategoryMenuUI";

export default function SearchCategoryMenu() {
  const { currentCategoryId, makeHref } = useSerachCategory();

  return (
    <CategoryMenuUI currentCategoryId={currentCategoryId} makeHref={makeHref} />
  );
}
