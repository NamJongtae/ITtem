"use client";

import { CATEGORY } from "@/constants/constant";
import useCurrentCategory from "@/hooks/commons/category/useCurrentCategory";

interface IPorops {
  className?: string;
}

export default function CategoryNav({ className }: IPorops) {
  const { currentCategory } = useCurrentCategory();

  return (
    <nav className={`flex self-start ${className}`}>
      <ol className="inline-flex items-center">
        <li className="inline-flex items-center">
          <svg
            className="w-3 h-3 me-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
          </svg>
          중고거래
        </li>
        <li>
          <div className="flex items-center">
            <svg
              className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
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
