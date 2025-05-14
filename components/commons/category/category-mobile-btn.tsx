import { escKeyClose } from "@/lib/optimizationKeyboard";
import React from "react";
import CategoryMobileBtnArrowIcon from "./category-mobile-btn-arrow-icon";

interface IProps {
  currentCategory: string;
  isOpenCategory: boolean;
  toggleCategory: () => void;
}

export default function CategoryMobileBtn({
  currentCategory,
  isOpenCategory,
  toggleCategory
}: IProps) {
  return (
    <button
      type="button"
      onClick={toggleCategory}
      className="inline-flex w-full max-w-[105px] justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 betterhover:hover:bg-gray-50 line-clamp-1"
      id="menu-button"
      aria-expanded="true"
      aria-haspopup="true"
      onKeyDown={(e) => escKeyClose({ event: e, closeCb: toggleCategory })}
    >
      {currentCategory}
      <CategoryMobileBtnArrowIcon isOpenCategory={isOpenCategory} />
    </button>
  );
}
