import Link from "next/link";
import { CATEGORY } from "@/domains/product/shared/constants/constants";

type Props = {
  currentCategoryId: number; // id 기반으로 통일 추천
  makeHref: (id: number) => string;
};

export default function CategoryList({ currentCategoryId, makeHref }: Props) {
  return (
    <ul className="hidden sm:grid sm:grid-cols-5 my-6 gap-1">
      {CATEGORY.map((label, id) => {
        const href = makeHref(id);
        const isActive = currentCategoryId === id;

        return (
          <li
            key={id}
            className={`${
              isActive
                ? "bg-gray-700 text-white betterhover:hover:text-black betterhover:hover:bg-gray-200"
                : "bg-white betterhover:hover:bg-gray-100"
            } border`}
            style={{ padding: "5px" }}
          >
            <Link className="w-full block text-center" href={href}>
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
