import { CATEGORY } from "@/constants/constant";
import useProfileDetailProductCategory from "@/hooks/profile/useProfileDetailProductCategory";
import { ProductCategory } from "@/types/productTypes";

interface IProps {
  currentCategory: ProductCategory;
  selectCategory: (category: ProductCategory) => void;
}
export default function ProfileDetailProductCategory({
  currentCategory,
  selectCategory,
}: IProps) {
  const { isOpenMenu, toggleMenu, menuRef, handleClickCategory } =
    useProfileDetailProductCategory({ selectCategory });

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleMenu}
        className="inline-flex w-[105px] justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 betterhover:hover:bg-gray-50 line-clamp-1"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
        {currentCategory}
        <svg
          className={`-mr-1 h-5 w-5 text-gray-400  ${
            isOpenMenu ? "rotate-180" : ""
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
      {isOpenMenu && (
        <ul
          className="absolute right-[0px] z-10 mt-1 w-[105px] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-x-hidden overflow-y-scroll p-1 max-h-[222px] scrollbar-hide animate-entering"
          role="menu"
          ref={menuRef}
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          {CATEGORY.map((category) => (
            <li key={category} className="">
              <button
                type="button"
                onClick={() => handleClickCategory(category as ProductCategory)}
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
      )}
    </div>
  );
}
