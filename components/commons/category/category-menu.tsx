import { CATEGORY } from '@/constants/constant';
import CategoryList from "./category-list";
import CategoryMobileMenu from "./category-mobile-menu";
import { useSearchParams } from "next/navigation";

export default function CategoryMenu() {
  const search = useSearchParams();

  const currentCategory = CATEGORY.includes(search.get("category") || "")
    ? (search.get("category") as string)
    : "전체";

  return (
    <div className="container mx-auto max-w-7xl">
      <CategoryList currentCategory={currentCategory} />
      <CategoryMobileMenu currentCategory={currentCategory}/>
    </div>
  );
}
