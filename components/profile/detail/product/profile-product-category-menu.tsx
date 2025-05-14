import useProductCategoryMenu from "@/hooks/profile/useProductCategoryMenu";
import { ProductCategory } from "@/types/product-types";
import Image from "next/image";
import ProfileProductCategoryMenuList from "./profile-product-category-menu-list";

interface IProps {
  currentCategory: ProductCategory;
  selectCategory: (category: ProductCategory) => void;
}
export default function ProfileProductCategoryMenu({
  currentCategory,
  selectCategory
}: IProps) {
  const {
    isOpenMenu,
    toggleMenu,
    menuRef,
    onClickCategory,
    setCategoryBtnRef,
    categoryOnKeyDown
  } = useProductCategoryMenu({ selectCategory });

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
        <Image
          src="/icons/drop-down-arrow-icon.svg"
          alt="화살표"
          className={`-mr-1 text-gray-400 transition-transform duration-200 ${
            isOpenMenu ? "rotate-180" : ""
          }`}
          width={20}
          height={20}
        />
      </button>
      {isOpenMenu && (
        <ProfileProductCategoryMenuList
          menuRef={menuRef}
          onClickCategory={onClickCategory}
          setCategoryBtnRef={setCategoryBtnRef}
          categoryOnKeyDown={categoryOnKeyDown}
          currentCategory={currentCategory}
        />
      )}
    </div>
  );
}
