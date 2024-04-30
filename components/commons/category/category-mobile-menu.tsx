import React from "react";
import CategoryMobileBtn from "./category-mobile-btn";
import CategoryMobileList from "./category-mobile-list";
import useMobileCategory from "@/hooks/layout/useMobileCategory";

interface IProps {
  currentCategory: string;
}

export default function CategoryMobileMenu({ currentCategory }: IProps) {
  const { isOpenMenu, toggleMenu, handleSelectMenu, menuRef } =
    useMobileCategory();
  return (
    <div className="relative sm:hidden mx-auto px-3 flex justify-end z-20">
      <CategoryMobileBtn
        currentCategory={currentCategory}
        isOpenCategory={isOpenMenu}
        toggleCategory={toggleMenu}
      />
      <CategoryMobileList
        isOpenCategory={isOpenMenu}
        currentCategory={currentCategory}
        handleSelectCategory={handleSelectMenu}
        ref={menuRef}
      />
    </div>
  );
}
