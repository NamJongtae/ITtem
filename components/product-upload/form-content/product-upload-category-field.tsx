import { CATEGORY } from "@/constants/constant";
import useProductUploadCategoryField from "@/hooks/product-upload/useProductUploadCategoryField";
import ProductUploadCategoryFieldItem from "./product-upload-category-field-item";

export default function ProductUploadCategoryField() {
  const { register, currentCategory, handleClickCategory } =
    useProductUploadCategoryField();
    const PRODUCT_CATEGORIES = CATEGORY.slice(1); // "전체" 항목 제외

  return (
    <div className="border-b py-8">
      <label className="sr-only" htmlFor="category">
        카테고리
      </label>
      <h3 className="font-semibold text-lg">
        카테고리 <span className="text-red-500">*</span>
      </h3>
      <ul className="mt-5 border rounded-md max-w-[370px] max-h-[202px] scrollbar bg-gray-50 overflow-y-scroll">
        {PRODUCT_CATEGORIES.map((category) => (
          <ProductUploadCategoryFieldItem
            key={category}
            category={category}
            handleClickCategory={handleClickCategory}
            currentCategory={currentCategory}
          />
        ))}
      </ul>
      <input
        className="hidden"
        {...register("category", {
          required: true
        })}
      />
    </div>
  );
}
