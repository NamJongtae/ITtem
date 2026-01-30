import { CATEGORY } from "@/domains/product/shared/constants/constants";
import useMobileCategoryList from "@/shared/layout/hooks/useMobileCategoryList";
import { escKeyClose } from "@/shared/common/utils/escKeyClose";
import React, { forwardRef } from "react";

interface IProps {
  isOpenCategory: boolean;
  toggleMenu: () => void;
  handleSelectCategory: (id: number) => void;
  currentCategoryId: number;
}

const CategoryMobileList = forwardRef<HTMLUListElement, IProps>(
  (
    { isOpenCategory, toggleMenu, handleSelectCategory, currentCategoryId },
    ref
  ) => {
    const { setCategoryClassName, setCategoryBtnRef, categoryOnKeyDown } =
      useMobileCategoryList({ currentCategoryId });

    return (
      isOpenCategory && (
        <ul
          className="absolute sm:hidden right-[10px] mt-10 w-[105px] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-x-hidden overflow-y-scroll p-1 max-h-[222px] scrollbar-hide animate-entering"
          role="menu"
          ref={ref}
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          onKeyDown={(e) => escKeyClose({ event: e, closeCb: toggleMenu })}
        >
          {CATEGORY.map((category, index) => (
            <li key={category}>
              <button
                type="button"
                onClick={() => handleSelectCategory(index)}
                className={setCategoryClassName(index)}
                role="menuitem"
                ref={setCategoryBtnRef(index)}
                onKeyDown={(e) => categoryOnKeyDown(e, index)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      )
    );
  }
);

CategoryMobileList.displayName = "CategoryMobileList";
export default CategoryMobileList;
