"use client";

import CategoryNavUI from "@/domains/product/shared/components/categoryNav/CategoryNavUI";
import useSerachCategory from "../hooks/useSerachCategory";
import { CATEGORY } from "@/domains/product/shared/constants/constants";

export default function SearchCategoryNav() {
  const { currentCategoryId } = useSerachCategory();
  const currentCategory = CATEGORY[currentCategoryId];

  return <CategoryNavUI className="ml-2" currentCategory={currentCategory} />;
}
