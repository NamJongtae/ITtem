import Link from "next/link";
import { CATEGORY } from "@/constants/constant";
import { usePathname, useSearchParams } from "next/navigation";

interface IProps {
  currentCategory: string;
}

export default function CategoryList({ currentCategory }: IProps) {
  const pathname = usePathname();
  const search = useSearchParams();
  const keyword = search.get("keyword");

  return (
    <ul className="hidden sm:grid sm:grid-cols-5 my-6 gap-1">
      {CATEGORY.map((category) => (
        <li
          key={category}
          className={`${
            currentCategory === category
              ? "bg-gray-700 text-white betterhover:hover:text-black betterhover:hover:bg-gray-200"
              : "bg-white betterhover:hover:bg-gray-100"
          } border `}
          style={{ padding: "5px" }}
        >
          <Link
            className="w-full block text-center"
            href={
              category === "전체"
                ? keyword
                  ? `${pathname}?keyword=${keyword}`
                  : pathname
                : keyword
                ? `${pathname}?keyword=${keyword}&category=${category}`
                : `${pathname}?category=${category}`
            }
          >
            {category}
          </Link>
        </li>
      ))}
    </ul>
  );
}
