import Link from "next/link";
import { CATEGORY } from "@/constants/constant";
import { forwardRef } from "react";
import { usePathname } from "next/navigation";

interface IProps {
  currentCategory: string | null;
}

const NavCategoryMenu = forwardRef<HTMLDivElement, IProps>(
  ({ currentCategory }, ref) => {
    const pathname = usePathname();

    return (
      <div
        className="absolute top-[40px] md:top-[54px] left-4 md:left-8 w-[200px] bg-white z-40 border"
        ref={ref}
      >
        <h2 className="text-center font-semibold py-2 border-b border-gray-400">
          전체 카테고리
        </h2>
        <ul className="flex flex-col w-full h-full py-5 bg-white max-h-[calc(100vh-240px)] overflow-y-scroll scrollbar">
          {CATEGORY.map((category) => (
            <li key={category} className="w-full h-ful">
              <Link
                href={`${
                  category === "전체"
                    ? "/product"
                    : `/product?category=${category}`
                }`}
                className={`${
                  (pathname.includes("product") &&
                    currentCategory === null &&
                    category === "전체") ||
                  currentCategory === category
                    ? "bg-red-400 text-white"
                    : "bg-none text-inherit"
                } block pl-5 py-2 w-full h-full text-sm betterhover:hover:bg-red-400 betterhover:hover:text-white`}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

NavCategoryMenu.displayName = "NavCategoryMenu";

export default NavCategoryMenu;
