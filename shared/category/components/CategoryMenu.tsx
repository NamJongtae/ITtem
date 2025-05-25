"use client";

import CategoryList from "./CategoryList";
import CategoryMobileMenu from "./CategoryMobileMenu";
import useCurrentCategory from "@/shared/category/hooks/useCurrentCategory";

export default function CategoryMenu() {
  const { currentCategory } = useCurrentCategory();

  return (
    <div className="container mx-auto max-w-7xl">
      <CategoryList currentCategory={currentCategory} />
      <CategoryMobileMenu currentCategory={currentCategory} />
    </div>
  );
}
