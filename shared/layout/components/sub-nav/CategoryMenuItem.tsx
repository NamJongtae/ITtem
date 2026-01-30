import { CATEGORY } from "@/domains/product/shared/constants/constants";
import { ProductCategory } from "@/domains/product/shared/types/productTypes";
import useNavCategoryMenu from "@/shared/layout/hooks/useNavCategoryMenu";
import Link from "next/link";

interface CategoryItemProps {
  categoryId: number;
  closeCategory: () => void;
  index: number;
}

export default function CategoryMenuItem({
  categoryId,
  closeCategory,
  index
}: CategoryItemProps) {
  const { setCategoryLinkRef, categoryOnKeyDown } = useNavCategoryMenu();

  const href = `/product/categories/${categoryId}`;
  const category = CATEGORY[categoryId] ?? ProductCategory.전체;

  return (
    <li key={categoryId} className="w-full h-full">
      <Link
        href={href}
        className="block pl-5 py-2 w-full h-full text-sm betterhover:hover:bg-red-400 betterhover:hover:text-white focus:outline-none focus:bg-red-400 focus:text-white "
        ref={setCategoryLinkRef(index)}
        onKeyDown={(e) => categoryOnKeyDown(e, index)}
        onClick={closeCategory}
      >
        {category}
      </Link>
    </li>
  );
}
