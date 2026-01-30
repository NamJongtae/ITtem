import { CATEGORY } from "@/domains/product/shared/constants/constants";
import CategoryMobileBtn from "./CategoryMobileBtn";
import CategoryMobileList from "./CategoryMobileList";
import useMobileCategory from "@/shared/layout/hooks/useMobileCategory";

interface IProps {
  currentCategoryId: number;
  makeHref: (id: number) => string;
}

export default function CategoryMobileMenu({
  currentCategoryId,
  makeHref
}: IProps) {
  const currentCategory = CATEGORY[currentCategoryId] ?? "전체";

  const { isOpenMenu, toggleMenu, handleSelectMenu, menuRef } =
    useMobileCategory(makeHref);

  return (
    <div className="relative sm:hidden mx-auto px-3 flex justify-end z-[11]">
      <CategoryMobileBtn
        currentCategory={currentCategory}
        isOpenCategory={isOpenMenu}
        toggleCategory={toggleMenu}
      />
      <CategoryMobileList
        isOpenCategory={isOpenMenu}
        currentCategoryId={currentCategoryId}
        toggleMenu={toggleMenu}
        handleSelectCategory={handleSelectMenu}
        ref={menuRef}
      />
    </div>
  );
}
