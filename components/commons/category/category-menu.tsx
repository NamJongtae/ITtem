import CategoryList from "./category-list";
import CategoryMobileMenu from "./category-mobile-menu";
import useCurrentCategory from "@/hooks/commons/category/useCurrentCategory";

export default function CategoryMenu() {
  const { currentCategory } = useCurrentCategory();

  return (
    <div className="container mx-auto max-w-7xl">
      <CategoryList currentCategory={currentCategory} />
      <CategoryMobileMenu currentCategory={currentCategory} />
    </div>
  );
}
