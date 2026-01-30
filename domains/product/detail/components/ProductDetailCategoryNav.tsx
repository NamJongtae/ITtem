import { useProductDetailCategory } from "../hooks/useProductDetailCategory";
import CategoryNavUI from "../../shared/components/categoryNav/CategoryNavUI";

export default function ProductDetailCategoryNav() {
  const { currentCategory } = useProductDetailCategory();

  return (
    <CategoryNavUI
      className={"max-w-7xl mx-auto mb-5"}
      currentCategory={currentCategory}
    />
  );
}
