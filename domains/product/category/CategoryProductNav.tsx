"use client";

import CategoryNavUI from "../shared/components/categoryNav/CategoryNavUI";
import { useCategoryProductCategory } from "./hooks/useCategoryProductCategory";

export default function CategoryProductNav() {
  const { currentCategory } = useCategoryProductCategory();

  return <CategoryNavUI className="ml-2" currentCategory={currentCategory} />;
}
