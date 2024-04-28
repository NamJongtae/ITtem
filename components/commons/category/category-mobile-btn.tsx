import React from "react";

interface IProps {
  currentCategory:string,
  isOpenCategory: boolean;
  toggleCategory: () => void;
}

export default function CategoryMobileBtn({
  currentCategory,
  isOpenCategory,
  toggleCategory,
}: IProps) {
  return (

      <button
        type="button"
        onClick={toggleCategory}
        className="inline-flex w-full max-w-[105px] justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 betterhover:hover:bg-gray-50 line-clamp-1"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
        {currentCategory}
        <svg
          className={`-mr-1 h-5 w-5 text-gray-400  ${
            isOpenCategory ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
  );
}
