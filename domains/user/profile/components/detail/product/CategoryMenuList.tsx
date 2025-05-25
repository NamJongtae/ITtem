import { CATEGORY } from "@/domains/product/shared/constants/constants";
import { ProductCategory } from "@/domains/product/shared/types/productTypes";
import React, { RefObject } from "react";

interface IProps {
  menuRef: RefObject<HTMLUListElement | null>;
  onClickCategory: (category: ProductCategory) => void;
  setCategoryBtnRef: (
    index: number
  ) => RefObject<HTMLButtonElement | null> | null;
  categoryOnKeyDown: (
    e: React.KeyboardEvent<HTMLElement>,
    index: number
  ) => void;
  currentCategory: string;
}
export default function CategoryMenuList({
  menuRef,
  onClickCategory,
  setCategoryBtnRef,
  categoryOnKeyDown,
  currentCategory
}: IProps) {
  return (
    <ul
      className="absolute right-[0px] z-[11] mt-1 w-[105px] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-x-hidden overflow-y-scroll p-1 max-h-[222px] scrollbar-hide animate-entering"
      role="menu"
      ref={menuRef}
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex={-1}
    >
      {CATEGORY.map((category, index) => (
        <li key={category} className="">
          <button
            type="button"
            onClick={() => onClickCategory(category as ProductCategory)}
            className={`${
              currentCategory === category &&
              "bg-gray-700 text-white betterhover:hover:text-black betterhover:hover:bg-gray-200"
            } text-gray-700 block px-3 py-2 text-sm w-full text-left rounded-md betterhover:hover:bg-gray-100 transition duration-150 ease-in-out`}
            role="menuitem"
            ref={setCategoryBtnRef(index)}
            onKeyDown={(e) => categoryOnKeyDown(e, index)}
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
  );
}
