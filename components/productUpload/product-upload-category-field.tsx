import { CATEGORY } from "@/constants/constant";
import useProductUploadCategoryField from "@/hooks/productUpload/useProductUploadCategoryField";
import { ProductCategory } from "@/types/productTypes";

export default function ProductUploadCategoryField() {
  const { register, currentCategory, handleClickCategory } =
    useProductUploadCategoryField();

  return (
    <div className="border-b py-8">
      <label className="sr-only" htmlFor="category">
        카테고리
      </label>
      <h3 className="font-semibold text-lg">
        카테고리 <span className="text-red-500">*</span>
      </h3>
      <ul className="mt-5 border rounded-md max-w-[370px] max-h-[202px] scrollbar bg-gray-50 overflow-y-scroll">
        {CATEGORY.slice(1, CATEGORY.length).map((category) => (
          <li key={category}>
            <button
              onClick={() => handleClickCategory(category as ProductCategory)}
              type="button"
              className={`px-5 py-2 w-full text-left ${
                currentCategory === category ? "bg-gray-200 text-red-500" : ""
              } betterhover:hover:bg-gray-200 betterhover:hover:text-red-500`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
      <input
        className="hidden"
        {...register("category", {
          required: true,
        })}
      />
    </div>
  );
}
