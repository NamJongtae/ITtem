"use client";

import CategoryMenuIcon from "@/public/icons/menu-icon.svg";
import CategoryMenu from "./CategoryMenu";
import useNavCategory from "@/shared/layout/hooks/useNavCategory";
import { escKeyClose } from "@/shared/common/utils/escKeyClose";
import SubNavMenu from "./SubNavMenu";

export default function SubNav() {
  const {
    isOpenCategory,
    toggleCategory,
    closeCategory,
    categoryRef,
    buttonRef
  } = useNavCategory();

  return (
    <nav className="relative flex justify-between px-4 sm:px-8 pb-4 max-w-[1024px] mx-auto">
      <div className="flex gap-3 items-center">
        <button
          onClick={toggleCategory}
          ref={buttonRef}
          onKeyDown={(e) => escKeyClose({ event: e, closeCb: toggleCategory })}
          aria-label="카테고리 메뉴"
        >
          <CategoryMenuIcon
            className={`w-6 h-6 ${
              isOpenCategory ? "fill-red-400" : "fill-black"
            }`}
          />
        </button>
        {isOpenCategory && (
          <CategoryMenu
            toggleCategory={toggleCategory}
            closeCategory={closeCategory}
            ref={categoryRef}
          />
        )}
      </div>
      <SubNavMenu />
    </nav>
  );
}
