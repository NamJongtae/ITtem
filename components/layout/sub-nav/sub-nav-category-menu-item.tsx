import useNavCategoryMenu from "@/hooks/layout/useNavCategoryMenu";
import Link from "next/link";

interface CategoryItemProps {
  category: string;
  currentCategory: string | null;
  index: number;
}

export default function SubNavCategoryMenuItem({
  category,
  currentCategory,
  index
}: CategoryItemProps) {
  const { activeCategoryClassName, setCategoryLinkRef, categoryOnKeyDown } =
    useNavCategoryMenu({ currentCategory });

  const href =
    category === "전체" ? "/product" : `/product?category=${category}`;

  const baseClass =
    "block pl-5 py-2 w-full h-full text-sm betterhover:hover:bg-red-400 betterhover:hover:text-white";
  const activeClass = activeCategoryClassName(category);

  return (
    <li key={category} className="w-full h-full">
      <Link
        href={href}
        className={`${baseClass} ${activeClass}`}
        ref={setCategoryLinkRef(index)}
        onKeyDown={(e) => categoryOnKeyDown(e, index)}
      >
        {category}
      </Link>
    </li>
  );
}
