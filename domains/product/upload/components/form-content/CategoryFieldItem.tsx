import { ProductCategory } from "../../../shared/types/productTypes";

export default function CategoryFieldItem({
  category,
  handleClickCategory,
  currentCategory
}: {
  category: string;
  handleClickCategory: (category: ProductCategory) => void;
  currentCategory: string;
}) {
  return (
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
  );
}
