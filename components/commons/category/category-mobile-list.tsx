import { CATEGORY } from "@/constants/constant";
import React, { forwardRef } from "react";

interface IProps {
  isOpenCategory: boolean;
  handleSelectCategory: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  currentCategory: string;
}

const CategoryMobileList = forwardRef<HTMLUListElement, IProps>(
  ({ isOpenCategory, handleSelectCategory, currentCategory }, ref) => {
    return (
      isOpenCategory && (
        <ul
          className="absolute sm:hidden right-[10px] z-10 mt-10 w-[105px] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-x-hidden overflow-y-scroll p-1 max-h-[222px] scrollbar-hide animate-entering"
          role="menu"
          ref={ref}
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          {CATEGORY.map((category) => (
            <li key={category} className="">
              <button
                type="button"
                data-category={category}
                onClick={handleSelectCategory}
                className={`${
                  currentCategory === category &&
                  "bg-gray-700 text-white betterhover:hover:text-black betterhover:hover:bg-gray-200"
                } text-gray-700 block px-3 py-2 text-sm w-full text-left rounded-md betterhover:hover:bg-gray-100 transition duration-150 ease-in-out`}
                role="menuitem"
                tabIndex={-1}
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
