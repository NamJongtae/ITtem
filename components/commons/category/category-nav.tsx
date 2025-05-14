"use client";

import { CATEGORY } from "@/constants/constant";
import useCurrentCategory from "@/hooks/commons/category/useCurrentCategory";
import CategoryIcon from "./category-icon";

interface IPorops {
  className?: string;
}

export default function CategoryNav({ className }: IPorops) {
  const { currentCategory } = useCurrentCategory();

  return (
    <nav className={`flex self-start ${className}`}>
      <ol className="inline-flex items-center">
        <li className="inline-flex items-center">중고거래</li>
        <li>
          <div className="flex items-center">
            <CategoryIcon />
            <span className="ms-1 text-gray-700dark:text-gray-400">
              {CATEGORY.includes(currentCategory || "")
                ? currentCategory
                : "전체"}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
}
