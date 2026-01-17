import useNavCategoryMenu from "@/shared/layout/hooks/useNavCategoryMenu";
import Link from "next/link";

interface CategoryItemProps {
  category: string;
  closeCategory: () => void;
  index: number;
}

export default function CategoryMenuItem({
  category,
  closeCategory,
  index
}: CategoryItemProps) {
  const { setCategoryLinkRef, categoryOnKeyDown } = useNavCategoryMenu();

  const href =
    category === "전체" ? "/product" : `/product?category=${category}`;

  return (
    <li key={category} className="w-full h-full">
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
