import CategoryMobileBtn from "./CategoryMobileBtn";
import CategoryMobileList from "./CategoryMobileList";
import useMobileCategory from "@/shared/layout/hooks/useMobileCategory";

interface IProps {
  currentCategory: string;
}

export default function CategoryMobileMenu({ currentCategory }: IProps) {
  const { isOpenMenu, toggleMenu, handleSelectMenu, menuRef } =
    useMobileCategory();
  return (
    <div className="relative sm:hidden mx-auto px-3 flex justify-end z-[11]">
      <CategoryMobileBtn
        currentCategory={currentCategory}
        isOpenCategory={isOpenMenu}
        toggleCategory={toggleMenu}
      />
      <CategoryMobileList
        isOpenCategory={isOpenMenu}
        currentCategory={currentCategory}
        toggleMenu={toggleMenu}
        handleSelectCategory={handleSelectMenu}
        ref={menuRef}
      />
    </div>
  );
}
